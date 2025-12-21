import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Zyvarin Social',
  description: 'Learn how Zyvarin Social collects, uses, and protects your personal data'
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
