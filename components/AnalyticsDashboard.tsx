'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Target, DollarSign, MapPin, Clock } from 'lucide-react'

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const tapData = [24, 38, 29, 52, 44, 31, 47]
const leadData = [8, 14, 10, 22, 18, 11, 19]

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    let val = 0
    const step = target / 60
    const interval = setInterval(() => {
      val += step
      if (val >= target) { setCurrent(target); clearInterval(interval) }
      else setCurrent(Math.floor(val))
    }, 20)
    return () => clearInterval(interval)
  }, [target])
  return <span>{prefix}{current.toLocaleString()}{suffix}</span>
}

const metrics = [
  { label: 'Total Taps', value: 2847, delta: '+23%', icon: Users },
  { label: 'Leads Generated', value: 847, delta: '+31%', icon: Target },
  { label: 'Conversion Rate', value: 29, suffix: '%', delta: '+8%', icon: TrendingUp },
  { label: 'Revenue Tracked', value: 34200, prefix: '$', delta: '+$8.1K', icon: DollarSign },
]

const recentLeads = [
  { name: 'Sarah Chen', company: 'TechStart', role: 'CEO', time: '2m ago', status: 'Hot' },
  { name: 'Michael Ross', company: 'Pearson Ventures', role: 'Partner', time: '15m ago', status: 'Warm' },
  { name: 'Priya Sharma', company: 'ScaleAI', role: 'VP Sales', time: '1h ago', status: 'Warm' },
  { name: 'Chris Park', company: 'Sequoia', role: 'Analyst', time: '3h ago', status: 'Cold' },
]

const statusStyles: Record<string, string> = {
  Hot: 'bg-red-600/20 text-red-400 border border-red-600/25',
  Warm: 'bg-amber-600/20 text-amber-400 border border-amber-600/25',
  Cold: 'bg-blue-600/20 text-blue-400 border border-blue-600/25',
}

export default function AnalyticsDashboard() {
  const maxTap = Math.max(...tapData)

  return (
    <section className="py-28 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-600/30 bg-red-600/[0.06] text-xs font-bold text-red-500 uppercase tracking-widest mb-5">
            Real-Time Analytics
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Your Performance, At a Glance
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Know who tapped, when they converted, and how much revenue your network is generating.
          </p>
        </div>

        {/* Dashboard frame */}
        <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Toolbar */}
          <div className="px-6 py-3 flex items-center justify-between" style={{ background: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['bg-red-500', 'bg-amber-500', 'bg-emerald-500'].map((c) => <div key={c} className={`w-2.5 h-2.5 ${c} rounded-full`} />)}
              </div>
              <span className="text-zinc-600 text-xs ml-1">TapFlow Analytics — Q2 2025</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.08)' }}>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {metrics.map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="rounded-2xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <Icon className="w-3.5 h-3.5 text-zinc-500" />
                      </div>
                      <span className="text-xs font-semibold text-red-500">{m.delta}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedNumber target={m.value} prefix={m.prefix} suffix={(m as any).suffix} />
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">{m.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Bar chart */}
              <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-white text-sm font-semibold">Taps & Leads</div>
                    <div className="text-zinc-600 text-xs">This week</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    {[['bg-red-600', 'Taps'], ['bg-emerald-600', 'Leads']].map(([c, l]) => (
                      <div key={l} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-sm ${c}`} />
                        <span className="text-zinc-500">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2 h-28">
                  {weekLabels.map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-0.5" style={{ height: '100px' }}>
                        <div className="flex-1 bg-gradient-to-t from-red-700 to-red-500 rounded-t-sm" style={{ height: `${(tapData[i] / maxTap) * 100}%` }} />
                        <div className="flex-1 bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t-sm" style={{ height: `${(leadData[i] / maxTap) * 100}%` }} />
                      </div>
                      <div className="text-zinc-700 text-xs">{day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent leads */}
              <div className="rounded-2xl p-5" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white text-sm font-semibold">Recent Leads</div>
                  <button className="text-red-500 text-xs hover:text-red-400 transition-colors">View all</button>
                </div>
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div key={lead.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {lead.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-semibold truncate">{lead.name}</div>
                        <div className="text-zinc-600 text-xs truncate">{lead.company} · {lead.role}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${statusStyles[lead.status]}`}>{lead.status}</span>
                        <span className="text-zinc-700 text-xs">{lead.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insight row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Top Event', value: 'SaaStr Annual', icon: MapPin, note: '94 taps' },
                { label: 'Peak Time', value: '2–4 PM', icon: Clock, note: 'Weekdays' },
                { label: 'Best Day', value: 'Thursday', icon: TrendingUp, note: '52 avg taps' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <Icon className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div>
                      <div className="text-zinc-600 text-xs">{item.label}</div>
                      <div className="text-white text-sm font-bold">{item.value}</div>
                      <div className="text-zinc-700 text-xs">{item.note}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
