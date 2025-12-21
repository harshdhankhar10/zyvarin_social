import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Compliance Policy - Zyvarin Social',
  description: 'Learn about Zyvarin Social\'s security measures and compliance standards'
}

export default function SecurityPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
