import prisma from "@/lib/prisma";
import { sendMail } from "@/utils/mail";
import { getUsageProgress, getPlanLimits } from "@/app/dashboard/pricingUtils";

export async function checkAndNotifyQuota(userId: string, type: 'ai' | 'posts') {
  const progress = await getUsageProgress(userId, type);
  const percentage = progress.percentage;

  if (percentage === 80 || percentage === 100) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        email: true, 
        fullName: true,
        subscription_plan: true 
      }
    });

    if (!user) return;

    const limits = getPlanLimits(user.subscription_plan);
    const typeName = type === 'ai' ? 'AI Generations' : 'Posts';
    const limit = type === 'ai' ? limits.aiGenerations : limits.posts;

    if (percentage === 80) {
      try {
        await sendMail({
          to: user.email,
          subject: `⚠️ You've Used 80% of Your ${typeName} Quota`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333;">Hi ${user.fullName},</h2>
              <p style="font-size: 16px; color: #555;">You've used <strong>${progress.used} out of ${limit}</strong> ${typeName.toLowerCase()} this month (80%).</p>
              <p style="font-size: 16px; color: #555;">You're approaching your monthly limit. Consider upgrading your plan for more usage.</p>
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/pricing" style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">View Plans</a>
              </div>
              <p style="font-size: 14px; color: #888;">Current Plan: <strong>${user.subscription_plan}</strong></p>
            </div>
          `
        });

        await prisma.notification.create({
          data: {
            userId,
            senderType: 'SYSTEM',
            title: `⚠️ 80% ${typeName} Quota Used`,
            message: `You've used ${progress.used}/${limit} ${typeName.toLowerCase()} this month. Consider upgrading for more capacity.`,
            isRead: false
          }
        });
      } catch (error) {
        console.error('Failed to send 80% quota warning:', error);
      }
    }

    if (percentage === 100) {
      try {
        await sendMail({
          to: user.email,
          subject: `🚫 ${typeName} Quota Limit Reached`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333;">Hi ${user.fullName},</h2>
              <p style="font-size: 16px; color: #555;">You've reached your monthly limit of <strong>${limit} ${typeName.toLowerCase()}</strong>.</p>
              <p style="font-size: 16px; color: #555;">To continue using this feature, please upgrade your plan or wait until next month when your quota resets.</p>
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/pricing" style="background-color: #DC2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Upgrade Now</a>
              </div>
              <p style="font-size: 14px; color: #888;">Current Plan: <strong>${user.subscription_plan}</strong></p>
            </div>
          `
        });

        await prisma.notification.create({
          data: {
            userId,
            senderType: 'SYSTEM',
            title: `🚫 ${typeName} Quota Exhausted`,
            message: `You've reached your limit of ${limit} ${typeName.toLowerCase()} for this month. Upgrade to continue or wait until next month.`,
            isRead: false
          }
        });
      } catch (error) {
        console.error('Failed to send 100% quota warning:', error);
      }
    }
  }
}
