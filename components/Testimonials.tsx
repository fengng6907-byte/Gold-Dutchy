import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus Webb',
    role: 'Enterprise AE · Salesforce',
    avatar: 'MW',
    stars: 5,
    quote: "I handed out 30 cards at a conference and used to follow up with 5. Now every tap is in my Salesforce pipeline before I walk away. Closed $180K from one event last quarter.",
    metric: '$180K from one event',
  },
  {
    name: 'Diana Park',
    role: 'Top 1% Realtor · Keller Williams',
    avatar: 'DP',
    stars: 5,
    quote: "Open houses used to be hit-or-miss. With TapFlow, every person who taps is in my CRM within seconds. My follow-up rate went from 30% to 95%.",
    metric: '3× follow-up rate',
  },
  {
    name: 'Jordan Lee',
    role: 'Founder & CEO · Buildfast (YC S24)',
    avatar: 'JL',
    stars: 5,
    quote: "At YC Demo Day I could see who revisited my profile — those were my warm leads. Closed our $1.2M seed in 6 weeks. 3 of 5 checks came from TapFlow-tracked intros.",
    metric: '$1.2M seed closed',
  },
  {
    name: 'Priya Sharma',
    role: 'VP Sales · ScaleUp SaaS',
    avatar: 'PS',
    stars: 5,
    quote: "We deployed TapFlow to 50 reps in one day. I can see exactly which reps generate the most leads at events and which events have the best ROI. Pipeline is up 340% YoY.",
    metric: '340% pipeline growth',
  },
  {
    name: 'Chris Andersen',
    role: 'Insurance Agent · Northwestern',
    avatar: 'CA',
    stars: 5,
    quote: "My whole business runs on referrals. TapFlow made my first impression 10× more memorable and the follow-up is automatic. Booked 22 new meetings this quarter from tap alerts.",
    metric: '22 meetings/quarter',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Co-founder · Apex Labs',
    avatar: 'YT',
    stars: 5,
    quote: "As a technical founder I was skeptical. But TapFlow is the most useful networking tool I've used. The analytics are real and it's helped me build warm pipeline faster than cold outreach.",
    metric: 'Cold outreach eliminated',
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
            <span className="ml-2 text-sm font-semibold text-zinc-500">4.9 / 5 · 2,400+ reviews</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Real People. Real Revenue.</h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            From solo founders to enterprise teams — TapFlow converts meetings into money.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="break-inside-avoid rounded-2xl p-6 hover:border-red-600/20 transition-all duration-200"
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />)}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div className="inline-block px-2.5 py-1 rounded-full text-xs font-bold text-red-500 mb-4"
                style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)' }}>
                {t.metric}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-zinc-600">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
