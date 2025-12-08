import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Zyvarin Social',
  description: 'Read our Terms of Service for using Zyvarin Social'
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
