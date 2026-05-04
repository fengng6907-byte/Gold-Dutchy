import { Smartphone, UserCheck, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Tap Your Card',
    desc: 'Hold your TapFlow card near any smartphone. Your professional profile appears instantly — no app required.',
    detail: 'Works via NFC on every modern iPhone and Android. Setup takes 5 minutes.',
    color: 'from-red-600 to-red-800',
    glow: 'rgba(220,38,38,0.3)',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Capture the Lead',
    desc: "The contact views your profile, saves your info — TapFlow logs them as a lead and syncs to your CRM. Zero manual entry.",
    detail: 'Hooks into Salesforce, HubSpot, Notion, or any CRM via webhook.',
    color: 'from-zinc-600 to-zinc-800',
    glow: 'rgba(255,255,255,0.05)',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Track & Convert',
    desc: 'Open your dashboard to see every tap, lead, and conversion — in real time. Know who to follow up with and when.',
    detail: 'Full tap analytics, revenue attribution, and team leaderboards.',
    color: 'from-red-700 to-red-900',
    glow: 'rgba(220,38,38,0.2)',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-bold text-zinc-400 uppercase tracking-widest mb-5">
            Simple by Design
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Three Steps. Zero Friction.
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            TapFlow turns every in-person interaction into a data point without adding a single step to your workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative rounded-3xl p-8 group hover:scale-[1.02] transition-all duration-300"
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Number */}
                <div className="text-7xl font-black text-white/[0.03] absolute top-4 right-6 select-none">{step.number}</div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: `0 8px 30px ${step.glow}` }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Step label */}
                <div className="text-xs font-bold text-zinc-700 uppercase tracking-widest mb-2">Step {step.number}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{step.desc}</p>

                <div className="flex items-start gap-2 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <svg className="w-3 h-3 text-zinc-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-zinc-600">{step.detail}</span>
                </div>

                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-full text-base hover:bg-red-500 transition-all duration-200 red-glow group"
          >
            Start Free — Card Ships in 3 Days
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-xs text-zinc-600 mt-3">No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
