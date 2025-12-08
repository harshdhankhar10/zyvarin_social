import { Metadata } from 'next'
import Navbar from '@/components/Global/Navbar'
import Footer from '@/components/Global/Footer'

export const metadata: Metadata = {
  title: 'About Zyvarin Social - Solo Creator\'s Journey',
  description: 'Meet Harsh, the founder of Zyvarin. A solo creator building the best social media scheduling tool for creators worldwide.',
  openGraph: {
    title: 'About Zyvarin Social',
    description: 'The story behind Zyvarin and why it was built',
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
