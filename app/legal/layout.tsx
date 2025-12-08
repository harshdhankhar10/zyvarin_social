import { ReactNode } from 'react'
import Navbar from '@/components/Global/Navbar'
import Footer from '@/components/Global/Footer'

export const metadata = {
  title: 'Legal - Zyvarin Social',
  description: 'Legal policies and terms for Zyvarin Social'
}

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
