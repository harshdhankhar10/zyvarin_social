"use client"

import React, { useRef } from 'react'
import { 
  Download, Printer, Share2, Copy, CheckCheck,
  FileText, Calendar, CreditCard, User, Mail,
  Building, Phone, Globe, ArrowLeft, ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { formatDate } from '@/utils/formatDate'

interface InvoiceViewProps {
  invoiceData: {
    invoiceNumber: string
    issueDate: Date
    dueDate: Date
    paidDate: Date | null
    invoiceStatus: string
    paymentStatus: string
    paymentMethod: string
    paymentGatewayId: string
    
    customer: {
      name: string
      email: string
      plan: string
    }
    
    items: Array<{
      description: string
      quantity: number
      unitPrice: number
      amount: number
    }>
    
    summary: {
      subtotal: number
      tax: number
      total: number
    }
    
    metadata: {
      invoiceId: string
      orderId: string
      currency: string
    }
  }
}

export default function ViewInvoice({ invoiceData }: InvoiceViewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = React.useState(false)


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 190
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`)
      

    } catch (error) {
        console.error('Error generating PDF:', error)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true)
        
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        setCopied(false)
      })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${invoiceData.invoiceNumber}`,
        text: `View invoice ${invoiceData.invoiceNumber} from Zyvarin Social`,
        url: window.location.href,
      })
    } else {
      handleCopyLink()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 print:p-0">
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/billing">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Billing
                </Button>
              </Link>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">Invoice #{invoiceData.invoiceNumber}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <CheckCheck className="w-4 h-4 mr-2 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? 'Copied' : 'Copy Link'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrint}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              
              <Button 
                onClick={handleDownloadPDF}
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Invoice Card */}
        <div 
          ref={invoiceRef}
          className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden print:shadow-none print:border-none"
        >
          {/* Invoice Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Z</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Zyvarin Social</h1>
                    <p className="text-gray-600">Social Media Management Platform</p>
                  </div>
                </div>
                
                <div className="space-y-1 mt-6">
                  <p className="text-sm text-gray-500">Company Address</p>
                  <p className="text-gray-700">
                    123 Tech Park, Sector 18<br />
                    Gurugram, Haryana 122015<br />
                    India
                  </p>
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">GSTIN:</span> 07AABCZ9605R1Z5
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-6">
                  {invoiceData.invoiceStatus.toUpperCase()}
                </div>
                
                <table className="text-left inline-table">
                  <tbody>
                    <tr>
                      <td className="pr-4 py-1 text-gray-500 font-medium">Invoice #</td>
                      <td className="py-1 font-semibold">{invoiceData.invoiceNumber}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1 text-gray-500 font-medium">Issue Date</td>
                      <td className="py-1">{formatDate(invoiceData.issueDate)}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1 text-gray-500 font-medium">Due Date</td>
                      <td className="py-1">{formatDate(invoiceData.dueDate)}</td>
                    </tr>
                    {invoiceData.paidDate && (
                      <tr>
                        <td className="pr-4 py-1 text-gray-500 font-medium">Paid Date</td>
                        <td className="py-1">{formatDate(invoiceData.paidDate)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Billing Details */}
          <div className="p-8 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Bill From</h3>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">Zyvarin Technologies Pvt. Ltd.</p>
                  <p className="text-gray-600">123 Tech Park, Sector 18</p>
                  <p className="text-gray-600">Gurugram, Haryana 122015</p>
                  <p className="text-gray-600">India</p>
                  <p className="text-gray-600">GSTIN: 07AABCZ9605R1Z5</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Bill To</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="font-semibold text-gray-900">{invoiceData.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{invoiceData.customer.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{invoiceData.customer.plan} Plan</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(invoiceData.paymentStatus)}>
                      {invoiceData.paymentStatus}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      via {invoiceData.paymentMethod}
                    </span>
                  </div>
                  {invoiceData.paymentGatewayId && (
                    <p className="text-xs text-gray-500 mt-2">
                      Transaction ID: {invoiceData.paymentGatewayId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="p-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Description</th>
                  <th className="text-right py-4 px-2 font-semibold text-gray-700">Quantity</th>
                  <th className="text-right py-4 px-2 font-semibold text-gray-700">Unit Price</th>
                  <th className="text-right py-4 px-2 font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-2">
                      <p className="font-medium text-gray-900">{item.description}</p>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-600">{item.quantity}</td>
                    <td className="py-4 px-2 text-right text-gray-600">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-4 px-2 text-right font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="py-4 px-2 text-right font-medium text-gray-700">
                    Subtotal
                  </td>
                  <td className="py-4 px-2 text-right font-medium text-gray-900">
                    {formatCurrency(invoiceData.summary.subtotal)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-4 px-2 text-right font-medium text-gray-700">
                    GST (18%)
                  </td>
                  <td className="py-4 px-2 text-right font-medium text-gray-900">
                    {formatCurrency(invoiceData.summary.tax)}
                  </td>
                </tr>
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={3} className="py-4 px-2 text-right font-bold text-gray-900 text-lg">
                    Total
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-indigo-600 text-lg">
                    {formatCurrency(invoiceData.summary.total)}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Payment Notes */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Payment Information</h4>
              <p className="text-sm text-gray-600">
                Amount includes 18% GST. This is a monthly subscription. Next billing date will be automatically charged to your saved payment method.
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className="text-gray-500">Currency:</span>
                <span className="font-medium">{invoiceData.metadata.currency}</span>
                <span className="text-gray-500">Order ID:</span>
                <span className="font-medium">{invoiceData.metadata.orderId}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Phone className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">+91 98765 43210</p>
                <p className="text-xs text-gray-500">Support</p>
              </div>
              <div>
                <Mail className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">billing@zyvarin.com</p>
                <p className="text-xs text-gray-500">Billing Inquiries</p>
              </div>
              <div>
                <Globe className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">https://zyvarin.com</p>
                <p className="text-xs text-gray-500">Website</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                This is a computer-generated invoice. No signature required.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Invoice ID: {invoiceData.metadata.invoiceId} | Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Print Message */}
        <div className="mt-6 text-center print:hidden">
          <p className="text-sm text-gray-500">
            For the best print results, use the "Download PDF" button or click "Print"
          </p>
        </div>
      </div>
    </div>
  )
}