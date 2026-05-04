'use client'

import { Zap, Target, BarChart2, Users } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Sharing',
    subtitle: 'Tap → Contact Saved',
    color: 'from-brand-500 to-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-100',
    desc: 'One tap shares your full professional profile — name, title, email, social links, calendar — to any phone without an app.',
    outcomes: ['Works on any iPhone or Android', "No app needed on receiver's phone", 'Customizable profile in minutes'],
    metric: { value: '< 3s', label: 'to share your full profile' },
  },
  {
    icon: Target,
    title: 'Lead Capture',
    subtitle: 'Every Tap = A Lead',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    desc: 'TapFlow automatically logs who tapped your card — name, company, time, location — and routes them to your CRM instantly.',
    outcomes: ['Auto-capture name + email', 'Instant CRM sync (Salesforce, HubSpot)', 'Slack / email notifications on tap'],
    metric: { value: '100%', label: 'leads captured, zero lost' },
  },
  {
    icon: BarChart2,
    title: 'Analytics',
    subtitle: 'Track, Measure, Optimize',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    desc: 'Know exactly how many people tapped, which events drove the most leads, and how those leads converted into revenue.',
    outcomes: ['Tap heatmaps by time + location', 'Conversion funnel tracking', 'Revenue attribution per contact'],
    metric: { value: '47%', label: 'avg lift in lead conversion' },
  },
  {
    icon: Users,
    title: 'Team Management',
    subtitle: 'Scale Across Your Org',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    desc: 'Deploy TapFlow to your entire sales team. Manage cards, enforce branding, and track team-level performance from one dashboard.',
    outcomes: ['Centralized card management', 'Role-based permissions', 'Team leaderboards + benchmarks'],
    metric: { value: '10x', label: 'faster team onboarding' },
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full text-xs font-semibold text-white mb-4">
            Everything You Need
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built Around Outcomes,<br />Not Features
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Every capability in TapFlow maps directly to pipeline, revenue, or time saved. No bloat. Just results.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`rounded-3xl border-2 ${feature.border} ${feature.bg} p-8 hover:shadow-lg transition-all duration-300 group`}
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {feature.subtitle}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  {/* Metric badge */}
                  <div className="text-right flex-shrink-0">
                    <div className={`text-3xl font-bold bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                      {feature.metric.value}
                    </div>
                    <div className="text-xs text-gray-500 max-w-[100px]">{feature.metric.label}</div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{feature.desc}</p>

                {/* Outcomes */}
                <ul className="space-y-2">
                  {feature.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-gray-800 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{outcome}</span>
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
