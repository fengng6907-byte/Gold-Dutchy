'use client'

import { Smartphone, UserCheck, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Tap Your Card',
    desc: 'Hold your TapFlow card near any smartphone — iPhone or Android. No app needed on their end. Your professional profile appears instantly.',
    color: 'from-brand-500 to-brand-600',
    detail: 'Works via NFC technology built into every modern phone. Setup takes under 5 minutes.',
    visual: (
      <div className="relative w-28 h-28 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full animate-ping-slow opacity-30" />
        <div className="relative w-full h-full bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center shadow-xl shadow-brand-500/30">
          <Smartphone className="w-12 h-12 text-white" />
        </div>
      </div>
    ),
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Capture the Lead',
    desc: 'The contact views your profile, saves your info — and TapFlow automatically logs their details as a lead in your dashboard and CRM.',
    color: 'from-emerald-500 to-teal-600',
    detail: 'Zero manual data entry. Leads route to Salesforce, HubSpot, or any CRM via webhook.',
    visual: (
      <div className="relative w-28 h-28 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full animate-ping-slow opacity-30" />
        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30">
          <UserCheck className="w-12 h-12 text-white" />
        </div>
      </div>
    ),
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Track & Convert',
    desc: "Open your TapFlow dashboard to see every tap, every lead, and how they're moving through your pipeline — all in real time.",
    color: 'from-violet-500 to-purple-600',
    detail: 'Full analytics on taps, conversions, revenue, and team performance. Weekly email summaries included.',
    visual: (
      <div className="relative w-28 h-28 mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-violet-200 rounded-full animate-ping-slow opacity-30" />
        <div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl shadow-violet-500/30">
          <TrendingUp className="w-12 h-12 text-white" />
        </div>
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4">
            Simple by Design
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Three Steps. Zero Friction.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            TapFlow turns every in-person interaction into a data point — without adding any complexity to your workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5">
            <div className="h-full bg-gradient-to-r from-brand-200 via-emerald-200 to-violet-200" />
          </div>

          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Step number */}
              <div className="text-xs font-bold text-gray-300 tracking-widest uppercase mb-6">
                Step {step.number}
              </div>

              {/* Icon circle */}
              <div className="mb-6">{step.visual}</div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-4">{step.desc}</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-50 rounded-full px-3 py-1.5">
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full text-lg hover:bg-brand-600 transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/30"
          >
            Start Your Free Trial
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-sm text-gray-400 mt-3">No credit card required. Card ships in 3 days.</p>
        </div>
      </div>
    </section>
  )
}
