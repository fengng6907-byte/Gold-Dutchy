'use client'

import { Zap, Target, BarChart2, Users } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Sharing',
    subtitle: 'Tap → Contact Saved',
    desc: 'One tap delivers your full professional profile — name, title, email, social, calendar link — to any phone without an app.',
    outcomes: ['Works on any iPhone or Android', "No app on receiver's phone", 'Customizable in minutes'],
    metric: { value: '< 3s', label: 'to share your full profile' },
    accent: 'from-red-600 to-red-800',
    glow: 'rgba(220,38,38,0.15)',
  },
  {
    icon: Target,
    title: 'Lead Capture',
    subtitle: 'Every Tap = A Lead',
    desc: 'TapFlow logs who tapped your card — name, company, time, location — and pushes them to your CRM the instant it happens.',
    outcomes: ['Auto-capture name + email', 'CRM sync (Salesforce, HubSpot)', 'Slack + email tap alerts'],
    metric: { value: '100%', label: 'leads captured, zero lost' },
    accent: 'from-red-600 to-rose-700',
    glow: 'rgba(220,38,38,0.12)',
  },
  {
    icon: BarChart2,
    title: 'Analytics',
    subtitle: 'Track, Measure, Convert',
    desc: 'Know exactly how many people tapped, which events drove leads, and how contacts are converting into revenue.',
    outcomes: ['Tap heatmaps by time + location', 'Conversion funnel tracking', 'Revenue attribution'],
    metric: { value: '47%', label: 'avg lift in lead conversion' },
    accent: 'from-zinc-600 to-zinc-800',
    glow: 'rgba(255,255,255,0.04)',
  },
  {
    icon: Users,
    title: 'Team Management',
    subtitle: 'Scale Across Your Org',
    desc: 'Deploy TapFlow to your entire team. Manage cards, enforce brand consistency, and track performance from one dashboard.',
    outcomes: ['Centralized card management', 'Role-based permissions', 'Team leaderboards'],
    metric: { value: '10×', label: 'faster team onboarding' },
    accent: 'from-zinc-600 to-zinc-800',
    glow: 'rgba(255,255,255,0.04)',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-bold text-zinc-400 uppercase tracking-widest mb-5">
            Core Capabilities
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Built Around Results,
            <br />Not Features
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Every capability maps directly to pipeline, revenue, or time saved.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="rounded-3xl p-8 group hover:scale-[1.01] transition-all duration-300"
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', boxShadow: `0 0 60px ${f.glow}` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-1">{f.subtitle}</div>
                    <h3 className="text-xl font-bold text-white">{f.title}</h3>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-3xl font-bold text-red-500">{f.metric.value}</div>
                    <div className="text-xs text-zinc-600 max-w-[90px]">{f.metric.label}</div>
                  </div>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed mb-5">{f.desc}</p>

                <ul className="space-y-2">
                  {f.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-zinc-400">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
