import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Zyvarin Social',
  description: 'Learn about how Zyvarin Social uses cookies and similar tracking technologies'
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
