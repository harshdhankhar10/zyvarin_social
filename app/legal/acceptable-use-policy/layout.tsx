import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy - Zyvarin Social',
  description: 'Review our Acceptable Use Policy for guidelines on using Zyvarin Social'
}

export default function AcceptableUsePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
