import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Agreement (DPA) - Zyvarin Social',
  description: 'Review our Data Processing Agreement for GDPR compliance'
}

export default function DPALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
