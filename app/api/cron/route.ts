import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import axios from 'axios';

async function publishPostServer(postId: string, platform: string, content: string, mediaUrls: string[]) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  let platformName = platform.toLowerCase();
  if (platformName === 'devto') platformName = 'dev_to';

  const response = await axios.post(`${baseUrl}/api/social/${platformName}/post`, {
    
    content: content.trim(),
    mediaUrls,
    postType: 'immediate',
    scheduledFor: null,
      postId: postId,
      fromCron: true
    });
  const data = response.data;
  const displayPlatform = platformName === 'dev_to' ? 'devto' : platformName;

  return {
    platform: displayPlatform,
    success: data.success || false,
    error: data.error || null
  };
}

async function handlePendingTransactions() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const failedTransactions = await prisma.transaction.updateMany({
    where: {
      status: 'PENDING',
      createdAt: {
        lt: oneDayAgo
      }
    },
    data: {
      status: 'FAILED',
      updatedAt: new Date()
    }
  });

  if (failedTransactions.count > 0) {
    const transactions = await prisma.transaction.findMany({
      where: {
        status: 'FAILED',
        updatedAt: {
          gte: oneDayAgo
        }
      },
      include: {
        user: true
      }
    });

    for (const transaction of transactions) {
      await prisma.notification.create({
        data: {
          userId: transaction.user.id,
          senderType: 'SYSTEM',
          title: '❌ Transaction Failed',
          message: `Your transaction (₹${transaction.amount}) could not be processed. Please try again or contact support.`,
          isRead: false
        }
      });
    }
  }

  return {
    failedCount: failedTransactions.count,
    timestamp: new Date().toISOString()
  };
}

async function handlePendingInvoices() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const overdueInvoices = await prisma.invoice.findMany({
    where: {
      paymentStatus: 'PENDING',
      createdAt: {
        lt: oneDayAgo
      }
    },
    include: {
      user: true
    }
  });

  let failedCount = 0;

  for (const invoice of overdueInvoices) {
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        paymentStatus: 'FAILED',
        updatedAt: new Date()
      }
    });

    await prisma.notification.create({
      data: {
        userId: invoice.user.id,
        senderType: 'SYSTEM',
        title: '❌ Invoice Payment Failed',
        message: `Invoice #${invoice.id.slice(0, 8)} for ₹${invoice.totalAmount} has expired. Please generate a new payment link.`,
        isRead: false
      }
    });

    failedCount++;
  }

  return {
    failedCount: failedCount,
    timestamp: new Date().toISOString()
  };
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: {
          lte: endOfDay,
          gte: startOfDay
        }
      },
      include: {
        socialProvider: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true
              }
            }
          }
        }
      }
    });


    const results = {
      success: 0,
      failed: 0,
      details: [] as any[]
    };

    for (const post of scheduledPosts) {
      try {
        const platform = post.socialProvider.provider;

        const result = await publishPostServer(
          post.id,
          platform,
          post.content,
          post.mediaUrls
        );

        if (result.success) {
          await prisma.notification.create({
            data: {
              userId: post.socialProvider.user.id,
              senderType: 'SYSTEM',
              title: '✅ Post Published Successfully',
              message: `Your scheduled post was published to ${result.platform}. "${post.content.substring(0, 50)}${post.content.length > 50 ? '...' : ''}"`,
              isRead: false
            }
          });

          results.success++;
          results.details.push({
            postId: post.id,
            platform: result.platform,
            status: 'success'
          });
        } else {
          await prisma.post.update({
            where: { id: post.id },
            data: {
              status: 'FAILED',
              errorMessage: result.error || 'Unknown error occurred'
            }
          });

          await prisma.notification.create({
            data: {
              userId: post.socialProvider.user.id,
              senderType: 'SYSTEM',
              title: '❌ Post Publishing Failed',
              message: `Failed to publish your scheduled post to ${result.platform}. Error: ${result.error}`,
              isRead: false
            }
          });

          results.failed++;
          results.details.push({
            postId: post.id,
            platform: result.platform,
            status: 'failed',
            error: result.error
          });
        }
      } catch (error: any) {
        console.error(`Error processing post ${post.id}:`, error);
        
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: 'FAILED',
            errorMessage: error.message || 'Unknown error'
          }
        });

        await prisma.notification.create({
          data: {
            userId: post.socialProvider.user.id,
            senderType: 'SYSTEM',
            title: '❌ Post Publishing Error',
            message: `An error occurred while publishing your post: ${error.message}`,
            isRead: false
          }
        });

        results.failed++;
        results.details.push({
          postId: post.id,
          platform: post.socialProvider.provider,
          status: 'error',
          error: error.message
        });
      }
    }

    const transactionResults = await handlePendingTransactions();
    const invoiceResults = await handlePendingInvoices();

    return NextResponse.json({
      success: true,
      jobs: {
        scheduledPosts: {
          processed: scheduledPosts.length,
          results
        },
        transactions: transactionResults,
        invoices: invoiceResults
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process scheduled posts' },
      { status: 500 }
    );
  }
}

