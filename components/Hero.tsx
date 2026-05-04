'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react'

const stats = [
  { label: 'Contacts Shared', value: '2.4M+' },
  { label: 'Leads Captured', value: '847K' },
  { label: 'Revenue Tracked', value: '$34M+' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [tapStage, setTapStage] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Cycle through tap animation stages
    const interval = setInterval(() => {
      setTapStage((s) => (s + 1) % 4)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  const stages = [
    { label: 'Tap Card', color: 'bg-brand-100 text-brand-700', icon: '📲' },
    { label: 'Profile Opens', color: 'bg-emerald-100 text-emerald-700', icon: '👤' },
    { label: 'Lead Captured', color: 'bg-violet-100 text-violet-700', icon: '✅' },
    { label: 'In Dashboard', color: 'bg-amber-100 text-amber-700', icon: '📊' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-50/30 to-violet-50/30 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-xs font-semibold text-brand-700 mb-6">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
              The #1 NFC Lead Platform for Professionals
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
              Turn Every Tap{' '}
              <span className="gradient-text">Into a Business</span>{' '}
              Opportunity
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-lg">
              One NFC tap shares your profile, captures the lead, and logs it straight into your dashboard. No apps. No friction. Just results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-900 text-white font-semibold rounded-full text-base hover:bg-brand-600 transition-all duration-200 hover:shadow-xl hover:shadow-brand-500/30 group"
              >
                Get Your Card Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-800 font-semibold rounded-full text-base border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-all duration-200"
              >
                See Live Demo
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className={`transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Outer glow ring */}
              <div className="absolute w-80 h-80 bg-gradient-to-br from-brand-200/30 to-violet-200/30 rounded-full blur-2xl animate-pulse-slow" />

              {/* Main card visual */}
              <div className="relative z-10 animate-float">
                {/* NFC Card */}
                <div className="w-72 h-44 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl relative overflow-hidden mx-auto mb-6">
                  {/* Card shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent" />
                  {/* NFC rings */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12">
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
                    <div className="absolute inset-2 border-2 border-white/20 rounded-full" />
                    <div className="absolute inset-4 border-2 border-white/20 rounded-full" />
                    <div className="absolute inset-[18px] bg-white/30 rounded-full" />
                  </div>
                  <div className="absolute left-6 bottom-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-brand-400 to-violet-500 rounded-md flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/90 text-xs font-semibold">TapFlow</span>
                    </div>
                    <div className="text-white font-bold text-lg">Alex Johnson</div>
                    <div className="text-white/60 text-xs">VP of Sales · Acme Corp</div>
                  </div>
                </div>

                {/* Flow indicators */}
                <div className="flex items-center justify-center gap-2">
                  {stages.map((stage, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500 ${
                          tapStage === i
                            ? `${stage.color} scale-110 shadow-md`
                            : i < tapStage
                            ? 'bg-gray-100 text-gray-400 scale-95'
                            : 'bg-gray-50 text-gray-300'
                        }`}
                      >
                        <span>{stage.icon}</span>
                        <span>{stage.label}</span>
                      </div>
                      {i < stages.length - 1 && (
                        <ArrowRight
                          className={`w-3 h-3 transition-colors ${
                            tapStage > i ? 'text-brand-400' : 'text-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Mini analytics card floating */}
                <div className="absolute -top-6 -right-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-44">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-gray-700">This Week</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">+47 leads</div>
                  <div className="text-xs text-emerald-600 font-medium mt-0.5">↑ 23% vs last week</div>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full w-3/4" />
                  </div>
                </div>

                {/* Mini notification floating */}
                <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-48">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm">✅</div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">New Lead!</div>
                      <div className="text-xs text-gray-500">Sarah Chen saved contact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-xs font-medium">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
