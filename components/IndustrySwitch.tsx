'use client'

import { useState } from 'react'
import { TrendingUp, Home, Lightbulb, ArrowRight } from 'lucide-react'

const industries = [
  {
    id: 'sales',
    label: 'Sales',
    icon: TrendingUp,
    emoji: '💼',
    headline: 'Close Deals Faster With Every Handshake',
    subheadline:
      'Turn trade shows, networking events, and cold calls into warm, trackable pipeline — instantly.',
    stats: [
      { value: '3x', label: 'More follow-ups' },
      { value: '67%', label: 'Faster close rate' },
      { value: '$12K', label: 'Avg revenue added/month' },
    ],
    points: [
      'Auto-sync every tap to Salesforce or HubSpot',
      'Get notified when prospects revisit your profile',
      'Track which events drive the most leads',
      'Team leaderboard to gamify performance',
    ],
    quote: '"I landed 3 new enterprise deals in my first month with TapFlow. It pays for itself in one meeting."',
    author: 'Marcus Webb, Enterprise AE at Salesforce',
    color: 'from-brand-500 to-brand-700',
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    badge: 'text-brand-700 bg-brand-100',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: Home,
    emoji: '🏡',
    headline: 'Every Open House Is a Lead Machine',
    subheadline:
      'Capture buyer and seller leads at every showing, open house, and networking event without ever losing a card.',
    stats: [
      { value: '5x', label: 'More leads captured' },
      { value: '89%', label: 'Follow-up rate' },
      { value: '$28K', label: 'Avg commission tracked' },
    ],
    points: [
      'Instantly share listings, bio, and contact info',
      'Capture buyer leads at open houses automatically',
      'Track which properties generate the most interest',
      'Sync to your CRM in one tap',
    ],
    quote: '"I used to lose half my leads on paper. Now every tap becomes a client in my pipeline."',
    author: 'Diana Park, Top 1% Realtor · Keller Williams',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'text-emerald-700 bg-emerald-100',
  },
  {
    id: 'founder',
    label: 'Founders',
    icon: Lightbulb,
    emoji: '🚀',
    headline: 'Your Network Is Your Net Worth — Make It Trackable',
    subheadline:
      'At every pitch, conference, or investor meeting — make sure every contact becomes an opportunity, not a forgotten business card.',
    stats: [
      { value: '10x', label: 'Network growth' },
      { value: '42%', label: 'Investor response rate' },
      { value: '∞', label: 'Impressions made' },
    ],
    points: [
      'Instantly share your pitch deck, LinkedIn, and calendly',
      'Track which investors viewed your profile',
      "Know who's warm before you follow up",
      'Brand your card with your startup identity',
    ],
    quote: '"I gave out 200 TapFlow cards at YC Demo Day. Closed our seed round from 3 warm intros I tracked through it."',
    author: 'Jordan Lee, Founder & CEO · Buildfast (YC S24)',
    color: 'from-violet-500 to-purple-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    badge: 'text-violet-700 bg-violet-100',
  },
]

export default function IndustrySwitch() {
  const [active, setActive] = useState(industries[0])

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4">
            Built For Your Industry
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            TapFlow Works For You
          </h2>
          <p className="text-xl text-gray-500">Pick your role. See your results.</p>
        </div>

        {/* Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl gap-1">
            {industries.map((ind) => {
              const Icon = ind.icon
              const isActive = active.id === ind.id
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {ind.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className={`rounded-3xl border-2 ${active.border} ${active.bg} p-8 lg:p-12 transition-all duration-300`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="text-5xl mb-4">{active.emoji}</div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {active.headline}
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{active.subheadline}</p>

              {/* Points */}
              <ul className="space-y-3 mb-8">
                {active.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center bg-gradient-to-br ${active.color}`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{point}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#pricing"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br ${active.color} text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-opacity`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Stats + Quote */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {active.stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-white">
                    <div className={`text-3xl font-bold bg-gradient-to-br ${active.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-white">
                <div className="text-4xl text-gray-300 mb-3">"</div>
                <p className="text-gray-800 font-medium leading-relaxed mb-4">{active.quote.slice(1, -1)}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${active.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {active.author[0]}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{active.author}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
