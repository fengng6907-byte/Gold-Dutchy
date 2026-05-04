import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProductShowcase from '@/components/ProductShowcase'
import InteractiveDemo from '@/components/InteractiveDemo'
import Features from '@/components/Features'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import ROISection from '@/components/ROISection'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#0a0a0a]">
      <Nav />
      <Hero />
      <ProductShowcase />
      <InteractiveDemo />
      <Features />
      <AnalyticsDashboard />
      <ROISection />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
