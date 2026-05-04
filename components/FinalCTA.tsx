'use client'

import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'

const trust = [
  { icon: Zap, label: 'Up in 5 minutes' },
  { icon: Shield, label: 'No credit card needed' },
  { icon: Clock, label: 'Card ships in 3 days' },
]

export default function FinalCTA() {
  return (
    <section className="py-28 bg-gray-950 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-gradient-to-r from-brand-600/20 to-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/80 mb-8">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Join 12,000+ professionals already using TapFlow
        </div>

        {/* Headline */}
        <h2 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
          Stop Losing Contacts.
          <br />
          <span className="bg-gradient-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent">
            Start Converting Them.
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Every meeting is a revenue opportunity. TapFlow makes sure you never let one slip through the cracks again.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-lg hover:bg-brand-50 transition-all duration-200 hover:shadow-2xl hover:shadow-white/20 group"
          >
            Get Your Card Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            Watch Demo
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {trust.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon className="w-4 h-4 text-gray-500" />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
