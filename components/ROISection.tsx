'use client'

import { useState } from 'react'
import { TrendingUp, Home, Lightbulb, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const segments = [
  {
    id: 'sales',
    label: 'Salespeople',
    icon: TrendingUp,
    emoji: '💼',
    color: 'red',
    headline: 'Close 3× More Deals From the Same Meetings',
    sub: 'Stop losing warm leads to bad follow-up. TapFlow captures every contact at the moment of handshake and routes them directly into your pipeline.',
    before: { label: 'Without TapFlow', items: ['40% of business cards lost within a week', 'Manual CRM entry kills 5+ hours/week', "No visibility on who's actually warm", '1 in 3 meetings never followed up'] },
    after: { label: 'With TapFlow', items: ['Every tap auto-logged as a CRM lead', '0 hours of manual data entry', 'Know who revisited your profile', '95% of meetings become pipeline'] },
    stats: [
      { value: '3×', label: 'Deal close rate' },
      { value: '$12K', label: 'Monthly revenue added' },
      { value: '5hrs', label: 'Saved per week' },
    ],
    quote: 'I landed 3 enterprise deals in month one. TapFlow pays for itself in a single meeting.',
    author: 'Marcus Webb · Enterprise AE, Salesforce',
  },
  {
    id: 'realestate',
    label: 'Real Estate Agents',
    icon: Home,
    emoji: '🏡',
    color: 'red',
    headline: 'Turn Every Open House Into a Lead Machine',
    sub: "An open house with 50 visitors should generate 50 leads. Right now you're capturing maybe 20. TapFlow fixes that — automatically.",
    before: { label: 'Without TapFlow', items: ['Paper sign-in sheets go unread', 'Buyers leave without saving your contact', 'No way to track interest by property', 'Follow-up is manual and slow'] },
    after: { label: 'With TapFlow', items: ['Every tap = a buyer lead in your CRM', 'Instant profile view shows seriousness', 'See which listings generate most interest', 'Automated follow-up sequences'] },
    stats: [
      { value: '5×', label: 'Leads per open house' },
      { value: '89%', label: 'Follow-up rate' },
      { value: '+3', label: 'Listings won/quarter' },
    ],
    quote: 'I used to lose half my open house leads. Now every tap becomes a client in my pipeline.',
    author: 'Diana Park · Top 1% Realtor, Keller Williams',
  },
  {
    id: 'founders',
    label: 'Startup Founders',
    icon: Lightbulb,
    emoji: '🚀',
    color: 'red',
    headline: 'Know Which Investors Are Actually Warm',
    sub: "You met 40 investors at Demo Day. 12 seemed interested. TapFlow tells you exactly which 3 to follow up with first — because they revisited your profile twice.",
    before: { label: 'Without TapFlow', items: ['No way to rank investor interest', 'Business cards shuffled into a pile', 'Spray-and-pray follow-up emails', "Can't track which intro sources work"] },
    after: { label: 'With TapFlow', items: ['See who revisits your profile (= warm)', 'Every contact auto-logged with context', 'Prioritize follow-up by engagement', 'Track which events drive investor intros'] },
    stats: [
      { value: '42%', label: 'Investor response rate' },
      { value: '10×', label: 'Network growth speed' },
      { value: '6wks', label: 'Avg to close seed round' },
    ],
    quote: 'I closed our $1.2M seed in 6 weeks. 3 of 5 checks came from TapFlow-tracked intros.',
    author: 'Jordan Lee · Founder, Buildfast (YC S24)',
  },
]

export default function ROISection() {
  const [active, setActive] = useState(segments[0])

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-600/30 bg-red-600/[0.06] text-xs font-bold text-red-500 uppercase tracking-widest mb-5">
            Proven ROI by Role
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Built for High-Performers
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            The professionals who win are the ones who track every interaction. Choose your role.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl gap-1" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            {segments.map((seg) => {
              const Icon = seg.icon
              const isActive = active.id === seg.id
              return (
                <button
                  key={seg.id}
                  onClick={() => setActive(seg)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg red-glow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {seg.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content panel */}
        <div
          className="rounded-3xl p-8 lg:p-12 transition-all duration-300"
          style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Red top accent line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <div>
              <div className="text-5xl mb-5">{active.emoji}</div>
              <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{active.headline}</h3>
              <p className="text-zinc-400 leading-relaxed mb-8">{active.sub}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {active.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="text-2xl font-bold text-red-500">{s.value}</div>
                    <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="rounded-2xl p-5" style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-red-600/50 text-3xl mb-2 font-serif">"</div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">{active.quote}</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                    {active.author[0]}
                  </div>
                  <span className="text-xs text-zinc-500">{active.author}</span>
                </div>
              </div>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-full text-sm hover:bg-red-500 transition-all red-glow-sm group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right: Before / After */}
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="rounded-2xl p-5" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Before</span>
                </div>
                <ul className="space-y-3">
                  {active.before.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-zinc-700 mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-xs text-zinc-500 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-2xl p-5" style={{ background: '#111', border: '1px solid rgba(220,38,38,0.15)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">With TapFlow</span>
                </div>
                <ul className="space-y-3">
                  {active.after.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-zinc-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
