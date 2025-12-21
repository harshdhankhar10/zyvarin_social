import { NextRequest, NextResponse } from 'next/server'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await currentLoggedInUserInfo()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const invoiceId = searchParams.get('invoiceId')

    if (!invoiceId) {
      return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 })
    }

    const invoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        userId: session.id
      },
      include: {
        user: true
      }
    })

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    const invoiceData = {
      invoiceNumber: invoice.invoiceNumber,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      paidDate: invoice.paidDate,
      customerName: invoice.user.fullName,
      customerEmail: invoice.user.email,
      plan: invoice.plan,
      planPeriod: invoice.planPeriod,
      subTotal: invoice.subTotal,
      taxAmount: invoice.taxAmount,
      totalAmount: invoice.totalAmount,
      currency: invoice.currency,
      paymentMethod: invoice.paymentMethod,
      paymentStatus: invoice.paymentStatus,
      itemDescription: invoice.itemDescription,
      itemQuantity: invoice.itemQuantity
    }

    return NextResponse.json({ invoice: invoiceData })
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 })
  }
}
