'use client'

import { useState, useEffect, useRef } from 'react'
import { Smartphone, User, CheckCircle, BarChart2, ArrowRight, Wifi } from 'lucide-react'

const demoSteps = [
  { id: 0, title: 'Tap Your Card', desc: 'Hold TapFlow card near any phone', icon: Smartphone, color: 'from-red-600 to-red-800', visual: 'tap' },
  { id: 1, title: 'Profile Opens Instantly', desc: 'Professional profile in under 1 second', icon: User, color: 'from-zinc-600 to-zinc-800', visual: 'profile' },
  { id: 2, title: 'Lead Auto-Captured', desc: 'Contact info logged, lead created', icon: CheckCircle, color: 'from-emerald-700 to-emerald-900', visual: 'lead' },
  { id: 3, title: 'Dashboard Updated', desc: 'Analytics updated in real-time', icon: BarChart2, color: 'from-red-700 to-red-900', visual: 'dashboard' },
]

function TapVisual() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="w-28 h-52 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl"
          style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="absolute inset-1 rounded-2xl" style={{ background: '#111' }} />
          <div className="relative z-10 text-center">
            <Wifi className="w-8 h-8 text-red-500 mx-auto mb-2 animate-pulse" />
            <div className="text-zinc-600 text-xs">NFC Ready</div>
          </div>
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-10 rounded-lg shadow-xl animate-bounce"
          style={{ background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border border-red-600/60 rounded-full" />
          </div>
        </div>
        {[60, 100, 140].map((size, i) => (
          <div key={i} className="absolute rounded-full border border-red-600/20"
            style={{ width: size, height: size, top: `calc(50% - ${size/2}px)`, left: `calc(50% - ${size/2}px)`, animation: `ping ${i * 0.4 + 1.2}s cubic-bezier(0,0,0.2,1) infinite` }} />
        ))}
      </div>
      <p className="text-sm text-zinc-500">Bring your card close…</p>
    </div>
  )
}

function ProfileVisual() {
  return (
    <div className="w-48 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-16 bg-gradient-to-br from-red-700 to-red-900" />
      <div className="px-4 pb-4 -mt-7">
        <div className="w-14 h-14 rounded-full border-4 bg-gradient-to-br from-zinc-600 to-zinc-800 mb-2 flex items-center justify-center text-xl" style={{ borderColor: '#111' }}>👔</div>
        <div className="font-bold text-white text-sm">Alex Johnson</div>
        <div className="text-xs text-zinc-500 mb-3">VP Sales · Acme Corp</div>
        {['📧 alex@acme.com', '📱 +1 555 0192', '🌐 linkedin.com/in/alex'].map((item) => (
          <div key={item} className="text-xs text-zinc-400 rounded-lg px-2 py-1.5 mb-1" style={{ background: 'rgba(255,255,255,0.04)' }}>{item}</div>
        ))}
        <button className="w-full mt-2 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl">Save Contact</button>
      </div>
    </div>
  )
}

function LeadVisual() {
  return (
    <div className="space-y-3 w-52">
      <div className="rounded-2xl p-4" style={{ background: 'rgba(5,46,22,0.5)', border: '1px solid rgba(21,128,61,0.3)' }}>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-400">Lead Captured!</span>
        </div>
        {[['Name', 'Sarah Chen'], ['Company', 'TechStart Inc'], ['Role', 'CEO'], ['Time', 'Just now']].map(([k, v]) => (
          <div key={k} className="flex justify-between text-xs mb-1">
            <span className="text-zinc-600">{k}</span>
            <span className="font-semibold text-zinc-300">{v}</span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-3" style={{ background: 'rgba(30,27,75,0.5)', border: '1px solid rgba(79,70,229,0.3)' }}>
        <div className="text-xs font-bold text-indigo-400 mb-1">Auto-added to CRM</div>
        <div className="text-xs text-zinc-500">Sent to Salesforce · Team notified</div>
      </div>
    </div>
  )
}

function DashboardVisual() {
  const bars = [65, 80, 55, 92, 70, 88, 95]
  return (
    <div className="w-52 rounded-2xl overflow-hidden shadow-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="px-3 py-2 flex items-center gap-1.5" style={{ background: '#0a0a0a' }}>
        {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((c) => <div key={c} className={`w-2 h-2 ${c} rounded-full`} />)}
        <span className="text-zinc-600 text-xs ml-1">Dashboard</span>
      </div>
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[['247', 'Taps', '+12%'], ['89', 'Leads', '+31%']].map(([val, lbl, d]) => (
            <div key={lbl} className="rounded-xl p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-lg font-bold text-white">{val}</div>
              <div className="text-xs text-zinc-600">{lbl}</div>
              <div className="text-xs text-red-500 font-semibold">{d}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs text-zinc-600 mb-2">Taps This Week</div>
          <div className="flex items-end gap-1 h-14">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-red-700 to-red-500 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const VisualMap: Record<string, React.FC> = { tap: TapVisual, profile: ProfileVisual, lead: LeadVisual, dashboard: DashboardVisual }

export default function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!auto) return
    timerRef.current = setTimeout(() => setActiveStep((s) => (s + 1) % demoSteps.length), 2500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeStep, auto])

  const handleStep = (i: number) => { setAuto(false); setActiveStep(i) }
  const ActiveVisual = VisualMap[demoSteps[activeStep].visual]

  return (
    <section id="demo" className="py-28 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-600/30 bg-red-600/[0.06] text-xs font-bold text-red-500 uppercase tracking-widest mb-5">
            Live Product Demo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">See TapFlow in Action</h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Watch how a single tap transforms into a tracked business opportunity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-2">
            {demoSteps.map((s, i) => {
              const Icon = s.icon
              const isActive = activeStep === i
              return (
                <button key={s.id} onClick={() => handleStep(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive ? 'bg-[#161616] border-red-600/30 shadow-lg' : 'bg-[#111]/60 border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 transition-transform ${isActive ? 'scale-110 shadow-md' : ''}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-zinc-700">Step {i + 1}</span>
                        {isActive && <span className="text-xs font-semibold text-red-500 bg-red-600/10 px-2 py-0.5 rounded-full">Active</span>}
                      </div>
                      <div className="font-semibold text-white text-sm">{s.title}</div>
                      <div className="text-xs text-zinc-500">{s.desc}</div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-colors ${isActive ? 'text-red-500' : 'text-zinc-700'}`} />
                  </div>
                  {isActive && auto && (
                    <div className="mt-3 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ animation: 'progress 2.5s linear forwards' }} />
                    </div>
                  )}
                </button>
              )
            })}
            <button onClick={() => { setActiveStep(0); setAuto(true) }} className="w-full py-3 text-xs font-semibold text-zinc-600 hover:text-red-500 transition-colors">
              ↺ Replay Demo
            </button>
          </div>

          <div className="flex items-center justify-center min-h-[380px] rounded-3xl p-8"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
            <ActiveVisual />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  )
}
