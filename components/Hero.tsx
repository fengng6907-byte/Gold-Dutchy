'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const stages = [
  { label: 'Tap Card', icon: '📲', color: 'border-red-600/40 text-red-400' },
  { label: 'Profile Opens', icon: '👤', color: 'border-white/20 text-zinc-300' },
  { label: 'Lead Captured', icon: '✅', color: 'border-emerald-600/40 text-emerald-400' },
  { label: 'In Dashboard', icon: '📊', color: 'border-white/20 text-zinc-300' },
]

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
    const interval = setInterval(() => setTapStage((s) => (s + 1) % 4), 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] pt-16">
      {/* Ambient light top-right */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-red-600/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-red-900/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-600/30 bg-red-600/[0.08] text-xs font-semibold text-red-400 mb-8">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              The #1 NFC Lead Platform for Professionals
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.04] tracking-tight mb-6">
              Turn Every Tap
              <br />
              <span className="red-text">Into Revenue</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-md">
              One NFC tap shares your profile, captures the lead, and logs it to your dashboard. No apps. No friction. Pure intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-red-600 text-white font-semibold rounded-full text-sm hover:bg-red-500 transition-all duration-200 red-glow group"
              >
                Get Your Card Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full text-sm border border-white/[0.12] hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200"
              >
                See Live Demo
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-white/[0.06]">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Card visual */}
          <div className={`transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />

              <div className="relative z-10 animate-float">
                {/* NFC Card */}
                <div className="w-72 h-44 rounded-2xl relative overflow-hidden mx-auto mb-6 shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 to-transparent" />
                  {/* NFC rings */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12">
                    {[0,2,4].map((i) => (
                      <div key={i} className="absolute rounded-full border border-white/10" style={{ inset: `${i * 4}px` }} />
                    ))}
                    <div className="absolute inset-[18px] bg-white/20 rounded-full" />
                  </div>
                  <div className="absolute left-6 bottom-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-red-600 rounded-md flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/60 text-xs font-semibold tracking-wider">TAPFLOW</span>
                    </div>
                    <div className="text-white font-bold text-lg tracking-tight">Alex Johnson</div>
                    <div className="text-white/40 text-xs">VP of Sales · Acme Corp</div>
                  </div>
                </div>

                {/* Tap stages */}
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {stages.map((stage, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-500 ${
                          tapStage === i
                            ? `${stage.color} bg-white/[0.05] scale-105`
                            : 'border-white/[0.06] text-zinc-600'
                        }`}
                      >
                        <span>{stage.icon}</span>
                        <span>{stage.label}</span>
                      </div>
                      {i < stages.length - 1 && (
                        <div className={`w-2 h-px transition-colors ${tapStage > i ? 'bg-red-600' : 'bg-white/10'}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Floating cards */}
                <div className="absolute -top-8 -right-12 matte-card rounded-2xl p-3 w-44 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-semibold text-zinc-300">This Week</span>
                  </div>
                  <div className="text-xl font-bold text-white">+47 leads</div>
                  <div className="text-xs text-emerald-500 mt-0.5">↑ 23% vs last week</div>
                  <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full w-3/4" />
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-10 matte-card rounded-2xl p-3 w-44 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-600/20 border border-emerald-600/30 rounded-full flex items-center justify-center text-xs">✅</div>
                    <div>
                      <div className="text-xs font-semibold text-white">New Lead</div>
                      <div className="text-xs text-zinc-500">Sarah Chen · CEO</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <div className="w-4 h-7 border border-white/10 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-red-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
