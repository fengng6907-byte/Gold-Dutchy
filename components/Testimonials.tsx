'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus Webb',
    role: 'Enterprise Account Executive',
    company: 'Salesforce',
    avatar: 'MW',
    avatarBg: 'from-brand-500 to-brand-700',
    stars: 5,
    quote:
      "I used to hand out 30 cards at a conference and follow up with maybe 5 people because I couldn't remember who was who. Now every tap is logged, tagged, and in my Salesforce pipeline before I've even walked away. Closed $180K from one event last quarter.",
    metric: '$180K from one event',
    metricColor: 'text-brand-600',
  },
  {
    name: 'Diana Park',
    role: 'Top 1% Realtor',
    company: 'Keller Williams',
    avatar: 'DP',
    avatarBg: 'from-emerald-500 to-teal-600',
    stars: 5,
    quote:
      "Open houses used to be hit-or-miss for lead capture. I'd get 40 visitors and lose half of them. With TapFlow, every single person who taps my card is in my CRM within seconds. My follow-up rate went from 30% to 95% and I closed 3 new listings directly from TapFlow leads this year.",
    metric: '3x follow-up rate',
    metricColor: 'text-emerald-600',
  },
  {
    name: 'Jordan Lee',
    role: 'Founder & CEO',
    company: 'Buildfast (YC S24)',
    avatar: 'JL',
    avatarBg: 'from-violet-500 to-purple-700',
    stars: 5,
    quote:
      "At YC Demo Day I handed my TapFlow card to 200+ people. Within 48 hours I could see who had viewed my profile more than once — those were my warm leads. I closed our $1.2M seed round in 6 weeks, and 3 of the 5 checks came from intros I tracked through TapFlow.",
    metric: '$1.2M seed round',
    metricColor: 'text-violet-600',
  },
  {
    name: 'Priya Sharma',
    role: 'VP of Sales',
    company: 'ScaleUp SaaS',
    avatar: 'PS',
    avatarBg: 'from-amber-500 to-orange-600',
    stars: 5,
    quote:
      "We deployed TapFlow to our 50-person sales team in under a day. The team dashboard alone paid for itself — I can see exactly which reps are generating leads at events, which events are highest ROI, and who needs coaching. Our event-sourced pipeline is up 340% year over year.",
    metric: '340% pipeline growth',
    metricColor: 'text-amber-600',
  },
  {
    name: 'Chris Andersen',
    role: 'Insurance Agent',
    company: 'Northwestern Mutual',
    avatar: 'CA',
    avatarBg: 'from-rose-500 to-pink-600',
    stars: 5,
    quote:
      "My entire business runs on referrals and networking. TapFlow made my first impression 10x more memorable, and the follow-up is automatic. I've booked 22 new client meetings this quarter just from TapFlow notifications telling me when someone revisited my profile.",
    metric: '22 new meetings/quarter',
    metricColor: 'text-rose-600',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Co-founder',
    company: 'Apex Labs',
    avatar: 'YT',
    avatarBg: 'from-cyan-500 to-blue-600',
    stars: 5,
    quote:
      "As a technical founder I was skeptical of anything that felt 'gimmicky.' But TapFlow is genuinely the most useful networking tool I've used. The analytics are real, the integrations are solid, and it's helped me build warm pipeline faster than cold outreach ever did.",
    metric: 'Cold outreach replaced',
    metricColor: 'text-cyan-600',
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-700 mb-4">
            ★★★★★ 4.9 / 5 · 2,400+ reviews
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Real People. Real Revenue.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            From solo founders to enterprise sales teams — TapFlow is how the best professionals close more deals.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="break-inside-avoid bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{t.quote}"</p>

              {/* Metric */}
              <div className={`text-sm font-bold ${t.metricColor} mb-5 bg-gray-100 inline-block px-3 py-1 rounded-full`}>
                {t.metric}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
