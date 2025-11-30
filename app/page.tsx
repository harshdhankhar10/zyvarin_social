import React from 'react'
import Navbar from '@/components/Global/Navbar'
import HeroSection from '@/components/Homepage/HeroSection'
import Features from '@/components/Homepage/Features'
import Integrations from '@/components/Homepage/Integrations'
import CTA from '@/components/Homepage/CTA'
import Footer from '@/components/Global/Footer'

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Integrations />
      <CTA />
      <Footer />
    </div>
  )
}

export default page