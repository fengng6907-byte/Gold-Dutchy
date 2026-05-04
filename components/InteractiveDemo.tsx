'use client'

import { useState, useEffect, useRef } from 'react'
import { Smartphone, User, CheckCircle, BarChart2, ArrowRight, Wifi } from 'lucide-react'

const demoSteps = [
  {
    id: 0,
    title: 'Tap Your Card',
    desc: 'Hold your TapFlow card near any phone',
    icon: Smartphone,
    color: 'from-brand-500 to-brand-600',
    visual: 'tap',
  },
  {
    id: 1,
    title: 'Profile Opens Instantly',
    desc: 'Your professional profile appears in seconds',
    icon: User,
    color: 'from-violet-500 to-violet-600',
    visual: 'profile',
  },
  {
    id: 2,
    title: 'Lead Auto-Captured',
    desc: 'Contact info saved, lead logged automatically',
    icon: CheckCircle,
    color: 'from-emerald-500 to-emerald-600',
    visual: 'lead',
  },
  {
    id: 3,
    title: 'Dashboard Updated',
    desc: 'See analytics, track performance in real-time',
    icon: BarChart2,
    color: 'from-amber-500 to-orange-500',
    visual: 'dashboard',
  },
]

function TapVisual() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Phone */}
        <div className="w-32 h-56 bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-1 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl" />
          <div className="relative z-10 text-center">
            <Wifi className="w-8 h-8 text-brand-400 mx-auto mb-2 animate-pulse" />
            <div className="text-white/60 text-xs">NFC Ready</div>
          </div>
        </div>
        {/* Card approaching */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl border border-gray-700 animate-bounce">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-brand-400 rounded-full opacity-70" />
          </div>
        </div>
        {/* Signal rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute border border-brand-300/40 rounded-full"
              style={{
                width: `${i * 60}px`,
                height: `${i * 60}px`,
                top: `${-i * 30}px`,
                left: `${-i * 30}px`,
                animation: `ping ${i * 0.5 + 1}s cubic-bezier(0,0,0.2,1) infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-600">Bring your card close…</p>
    </div>
  )
}

function ProfileVisual() {
  return (
    <div className="w-52 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-gradient-to-br from-brand-500 to-violet-600" />
      <div className="px-4 pb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-300 to-violet-400 border-4 border-white -mt-8 mb-2 flex items-center justify-center text-2xl">
          👔
        </div>
        <div className="font-bold text-gray-900">Alex Johnson</div>
        <div className="text-xs text-gray-500 mb-3">VP of Sales · Acme Corp</div>
        <div className="space-y-1.5">
          {['📧 alex@acme.com', '📱 +1 (555) 0192', '🌐 linkedin.com/in/alex'].map((item) => (
            <div key={item} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5">
              {item}
            </div>
          ))}
        </div>
        <button className="w-full mt-3 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl">
          Save Contact
        </button>
      </div>
    </div>
  )
}

function LeadVisual() {
  return (
    <div className="space-y-3 w-56">
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700">Lead Captured!</span>
        </div>
        <div className="space-y-1">
          {[
            { label: 'Name', value: 'Sarah Chen' },
            { label: 'Company', value: 'TechStart Inc' },
            { label: 'Role', value: 'CEO' },
            { label: 'Time', value: 'Just now' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-xs">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3">
        <div className="text-xs font-bold text-blue-700 mb-1">Auto-added to CRM</div>
        <div className="text-xs text-blue-600">Sent to Salesforce · Notified team</div>
      </div>
    </div>
  )
}

function DashboardVisual() {
  const bars = [65, 80, 55, 92, 70, 88, 95]
  return (
    <div className="w-56 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gray-900 px-3 py-2 flex items-center gap-1.5">
        {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c) => (
          <div key={c} className={`w-2 h-2 ${c} rounded-full`} />
        ))}
        <span className="text-white/60 text-xs ml-1">TapFlow Dashboard</span>
      </div>
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Taps', value: '247', delta: '+12%' },
            { label: 'Leads', value: '89', delta: '+31%' },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 rounded-xl p-2">
              <div className="text-lg font-bold text-gray-900">{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="text-xs text-emerald-600 font-semibold">{item.delta}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-600 mb-2">Taps This Week</div>
          <div className="flex items-end gap-1 h-16">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-brand-500 to-violet-400 rounded-t-sm transition-all"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const VisualMap: Record<string, React.FC> = {
  tap: TapVisual,
  profile: ProfileVisual,
  lead: LeadVisual,
  dashboard: DashboardVisual,
}

export default function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!auto) return
    timerRef.current = setTimeout(() => {
      setActiveStep((s) => (s + 1) % demoSteps.length)
    }, 2500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeStep, auto])

  const handleStep = (i: number) => {
    setAuto(false)
    setActiveStep(i)
  }

  const ActiveVisual = VisualMap[demoSteps[activeStep].visual]
  const step = demoSteps[activeStep]

  return (
    <section id="demo" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-xs font-semibold text-brand-700 mb-4">
            Live Product Demo
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See TapFlow in Action
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Watch how a single tap transforms into a tracked business opportunity — in under 3 seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-3">
            {demoSteps.map((s, i) => {
              const Icon = s.icon
              const isActive = activeStep === i
              return (
                <button
                  key={s.id}
                  onClick={() => handleStep(i)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-brand-300 bg-white shadow-lg shadow-brand-100'
                      : 'border-gray-100 bg-white/60 hover:border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 transition-transform ${
                        isActive ? 'scale-110 shadow-md' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">Step {i + 1}</span>
                        {isActive && (
                          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-gray-900">{s.title}</div>
                      <div className="text-sm text-gray-500">{s.desc}</div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-500' : 'text-gray-300'}`}
                    />
                  </div>

                  {/* Progress bar */}
                  {isActive && auto && (
                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${s.color} rounded-full`}
                        style={{ animation: 'progress 2.5s linear forwards' }}
                      />
                    </div>
                  )}
                </button>
              )
            })}

            <button
              onClick={() => { setActiveStep(0); setAuto(true) }}
              className="w-full py-3 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              ↺ Replay Demo
            </button>
          </div>

          {/* Visual */}
          <div className="flex items-center justify-center min-h-[400px] bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
            <div className="transition-all duration-500">
              <ActiveVisual />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </section>
  )
}
