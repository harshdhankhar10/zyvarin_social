import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases - Zyvarin Social',
  description: 'Discover how creators, agencies, startups, and enterprises use Zyvarin to manage their social media',
  openGraph: {
    title: 'Use Cases - Zyvarin Social',
    description: 'Solutions for every type of user',
  }
}

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
