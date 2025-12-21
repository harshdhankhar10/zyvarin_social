'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Receipt,
  Search,
  FileText,
  FileSpreadsheet,
  ChevronDown,
  X
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from '@/utils/formatDate'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Transaction {
  id: string
  transactionType: string
  amount: number
  currency: string
  status: string
  paymentMethod: string
  transactionDate: Date
  additionalInfo: any
}

interface Props {
  transactions: Transaction[]
  currentPage: number
  totalPages: number
  totalCount: number
}

export default function TransactionsHistory({ 
  transactions, 
  currentPage, 
  totalPages,
  totalCount 
}: Props) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [typeFilter, setTypeFilter] = useState<string>('ALL')
  const [showFilters, setShowFilters] = useState(false)

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/settings/transactions-history?page=${page}`)
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.transactionType.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'ALL' || transaction.status === statusFilter
      const matchesType = typeFilter === 'ALL' || transaction.transactionType === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [transactions, searchQuery, statusFilter, typeFilter])

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      SUCCESS: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      SUBSCRIPTION_PAYMENT: 'Subscription',
      REFUND: 'Refund',
      ADDON_PURCHASE: 'Add-on',
    }
    return labels[type as keyof typeof labels] || type
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SUBSCRIPTION_PAYMENT':
        return <CreditCard className="w-4 h-4 text-blue-600" />
      case 'REFUND':
        return <Receipt className="w-4 h-4 text-purple-600" />
      case 'ADDON_PURCHASE':
        return <Receipt className="w-4 h-4 text-green-600" />
      default:
        return <Receipt className="w-4 h-4 text-gray-600" />
    }
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text('Transaction History', 14, 22)
    
    doc.setFontSize(11)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)
    doc.text(`Total Transactions: ${filteredTransactions.length}`, 14, 36)

    const tableData = filteredTransactions.map((transaction) => [
      transaction.id.substring(0, 12) + '...',
      getTypeLabel(transaction.transactionType),
        transaction.currency + ' ' + transaction.amount.toString(),
      transaction.paymentMethod,
      transaction.status,
      formatDate(transaction.transactionDate)
    ])

    autoTable(doc, {
      startY: 42,
      head: [['Transaction ID', 'Type', 'Amount', 'Payment Method', 'Status', 'Date']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
    })

    doc.save(`transactions_${new Date().getTime()}.pdf`)
  }

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'Type', 'Amount', 'Currency', 'Payment Method', 'Status', 'Date']
    
    const csvData = filteredTransactions.map((transaction) => [
      transaction.id,
      getTypeLabel(transaction.transactionType),
      transaction.amount,
      transaction.currency,
      transaction.paymentMethod,
      transaction.status,
      formatDate(transaction.transactionDate)
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `transactions_${new Date().getTime()}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('ALL')
    setTypeFilter('ALL')
  }

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'ALL' || typeFilter !== 'ALL'

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-sm text-gray-600 mt-1">
            View all your payment transactions and billing history
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={exportToPDF} className="gap-2 cursor-pointer">
              <FileText className="w-4 h-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
              <FileSpreadsheet className="w-4 h-4" />
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by ID, payment method, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          size="default" 
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          Filter
          {hasActiveFilters && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
              {[statusFilter !== 'ALL', typeFilter !== 'ALL'].filter(Boolean).length}
            </span>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">All Status</option>
                <option value="SUCCESS">Success</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">All Types</option>
                <option value="SUBSCRIPTION_PAYMENT">Subscription</option>
                <option value="REFUND">Refund</option>
                <option value="ADDON_PURCHASE">Add-on</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Receipt className="w-4 h-4" />
            <span>Showing {filteredTransactions.length} of {totalCount} transactions</span>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      {transaction.id.substring(0, 12)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.transactionType)}
                        <span className="font-medium text-gray-900">
                          {getTypeLabel(transaction.transactionType)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{transaction.paymentMethod}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatDate(transaction.transactionDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber
                      if (totalPages <= 5) {
                        pageNumber = i + 1
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i
                      } else {
                        pageNumber = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className="w-9 h-9 p-0"
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Receipt className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {hasActiveFilters ? 'No matching transactions' : 'No transactions yet'}
            </h3>
            <p className="text-gray-600 text-center max-w-sm">
              {hasActiveFilters 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Your transaction history will appear here once you make your first payment or subscription.'}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" className="mt-4">
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <Receipt className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Need help with a transaction?</h4>
            <p className="text-sm text-blue-800">
              If you have questions about any transaction, please contact our support team with the transaction ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
