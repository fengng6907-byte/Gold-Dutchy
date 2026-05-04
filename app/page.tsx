import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import InteractiveDemo from '@/components/InteractiveDemo'
import IndustrySwitch from '@/components/IndustrySwitch'
import Features from '@/components/Features'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import ROICalculator from '@/components/ROICalculator'
import Comparison from '@/components/Comparison'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <InteractiveDemo />
      <IndustrySwitch />
      <Features />
      <AnalyticsDashboard />
      <ROICalculator />
      <Comparison />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
