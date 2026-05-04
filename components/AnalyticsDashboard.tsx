'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Target, DollarSign, MapPin, Clock } from 'lucide-react'

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const tapData = [24, 38, 29, 52, 44, 31, 47]
const leadData = [8, 14, 10, 22, 18, 11, 19]

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const step = target / 60
    let val = 0
    const interval = setInterval(() => {
      val += step
      if (val >= target) {
        setCurrent(target)
        clearInterval(interval)
      } else {
        setCurrent(Math.floor(val))
      }
    }, 20)
    return () => clearInterval(interval)
  }, [target])

  return (
    <span>
      {prefix}{current.toLocaleString()}{suffix}
    </span>
  )
}

const metrics = [
  {
    label: 'Total Taps',
    value: 2847,
    delta: '+23%',
    icon: Users,
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    iconBg: 'bg-brand-100',
    positive: true,
  },
  {
    label: 'Leads Generated',
    value: 847,
    delta: '+31%',
    icon: Target,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    positive: true,
  },
  {
    label: 'Conversion Rate',
    value: 29,
    suffix: '%',
    delta: '+8%',
    icon: TrendingUp,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    positive: true,
  },
  {
    label: 'Revenue Tracked',
    value: 34200,
    prefix: '$',
    delta: '+$8.1K',
    icon: DollarSign,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    positive: true,
  },
]

const recentLeads = [
  { name: 'Sarah Chen', company: 'TechStart', role: 'CEO', time: '2m ago', status: 'Hot' },
  { name: 'Michael Ross', company: 'Pearson Ventures', role: 'Partner', time: '15m ago', status: 'Warm' },
  { name: 'Priya Sharma', company: 'ScaleAI', role: 'VP Sales', time: '1h ago', status: 'Warm' },
  { name: 'Chris Park', company: 'Sequoia', role: 'Analyst', time: '3h ago', status: 'Cold' },
]

const statusColors: Record<string, string> = {
  Hot: 'bg-red-100 text-red-700',
  Warm: 'bg-amber-100 text-amber-700',
  Cold: 'bg-blue-100 text-blue-700',
}

export default function AnalyticsDashboard() {
  const maxTap = Math.max(...tapData)
  const maxLead = Math.max(...leadData)

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-full text-xs font-semibold text-violet-700 mb-4">
            Real-Time Analytics
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Performance,<br />At a Glance
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            No more guessing. See exactly who tapped, when they converted, and how much revenue your network is generating.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="bg-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Toolbar */}
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((c) => (
                  <div key={c} className={`w-3 h-3 ${c} rounded-full`} />
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2">TapFlow Analytics — Q2 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live
              </div>
              <span className="text-gray-600 text-xs">Last sync: just now</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Metrics row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-400">{m.delta}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedNumber
                        target={m.value}
                        prefix={m.prefix}
                        suffix={(m as any).suffix}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Bar chart */}
              <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-white font-semibold">Taps & Leads</div>
                    <div className="text-gray-500 text-xs">This week</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-brand-500" />
                      <span className="text-gray-400">Taps</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                      <span className="text-gray-400">Leads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {weekLabels.map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-0.5" style={{ height: '100px' }}>
                        {/* Tap bar */}
                        <div
                          className="flex-1 bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-sm transition-all duration-700"
                          style={{ height: `${(tapData[i] / maxTap) * 100}%` }}
                        />
                        {/* Lead bar */}
                        <div
                          className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-700"
                          style={{ height: `${(leadData[i] / maxTap) * 100}%` }}
                        />
                      </div>
                      <div className="text-gray-600 text-xs">{day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent leads */}
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold text-sm">Recent Leads</div>
                  <button className="text-brand-400 text-xs hover:text-brand-300">View all</button>
                </div>
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div key={lead.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {lead.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-semibold truncate">{lead.name}</div>
                        <div className="text-gray-500 text-xs truncate">{lead.company} · {lead.role}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                        <span className="text-gray-600 text-xs">{lead.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Top Event', value: 'SaaStr Annual', icon: MapPin, note: '94 taps' },
                { label: 'Peak Time', value: '2–4 PM', icon: Clock, note: 'Weekdays' },
                { label: 'Best Day', value: 'Thursday', icon: TrendingUp, note: '52 avg taps' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">{item.label}</div>
                      <div className="text-white text-sm font-bold">{item.value}</div>
                      <div className="text-gray-600 text-xs">{item.note}</div>
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
