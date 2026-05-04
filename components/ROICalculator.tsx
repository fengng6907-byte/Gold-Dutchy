'use client'

import { useState, useMemo } from 'react'
import { DollarSign, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ROICalculator() {
  const [meetings, setMeetings] = useState(10)
  const [conversion, setConversion] = useState(15)
  const [dealValue, setDealValue] = useState(5000)

  const results = useMemo(() => {
    const totalMeetings = meetings * 52
    const currentLeads = totalMeetings * 0.4
    const tapflowLeads = totalMeetings * 0.95
    const currentRevenue = currentLeads * (conversion / 100) * dealValue
    const tapflowRevenue = tapflowLeads * (conversion / 100) * dealValue
    const missed = tapflowRevenue - currentRevenue
    return {
      missed: Math.round(missed),
      monthlyMissed: Math.round(missed / 12),
      tapflowRevenue: Math.round(tapflowRevenue),
      roi: Math.round((missed / 120) * 100),
      additionalLeads: Math.round(tapflowLeads - currentLeads),
    }
  }, [meetings, conversion, dealValue])

  const fmt = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`

  const SliderLabel = ({ label, val, color }: { label: string; val: string; color: string }) => (
    <div className="flex justify-between items-center mb-3">
      <label className="text-sm font-medium text-zinc-400">{label}</label>
      <span className={`font-bold text-lg ${color}`}>{val}</span>
    </div>
  )

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-600/30 bg-amber-600/[0.06] text-xs font-bold text-amber-500 uppercase tracking-widest mb-5">
            ROI Calculator
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            How Much Are You Leaving on the Table?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Drag the sliders to see your exact revenue miss.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Inputs */}
          <div className="rounded-3xl p-8 space-y-8" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-sm font-bold text-white">Your Numbers</div>

            {[
              { label: 'Meetings / week', val: String(meetings), color: 'text-red-400', min: 1, max: 50, step: 1, value: meetings, onChange: setMeetings, accent: 'accent-red-600' },
              { label: 'Close rate', val: `${conversion}%`, color: 'text-amber-400', min: 1, max: 50, step: 1, value: conversion, onChange: setConversion, accent: 'accent-amber-500' },
            ].map((s) => (
              <div key={s.label}>
                <SliderLabel label={s.label} val={s.val} color={s.color} />
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                  onChange={(e) => s.onChange(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${s.accent}`}
                  style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="flex justify-between text-xs text-zinc-700 mt-1">
                  <span>{s.min}{s.label.includes('%') ? '' : ''}</span><span>{s.max}{s.label.includes('rate') ? '%' : ''}</span>
                </div>
              </div>
            ))}

            <div>
              <SliderLabel label="Avg deal value" val={fmt(dealValue)} color="text-emerald-400" />
              <input type="range" min={500} max={100000} step={500} value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-500"
                style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="flex justify-between text-xs text-zinc-700 mt-1"><span>$500</span><span>$100K</span></div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3">
            <div className="rounded-3xl p-7" style={{ background: 'rgba(127,29,29,0.2)', border: '1px solid rgba(220,38,38,0.25)' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-semibold text-sm">Revenue Missing / Year</span>
              </div>
              <div className="text-5xl font-bold text-white mb-1">{fmt(results.missed)}</div>
              <div className="text-red-400/60 text-sm">{fmt(results.monthlyMissed)}/month in uncaptured leads</div>
            </div>

            <div className="rounded-3xl p-5" style={{ background: 'rgba(5,46,22,0.3)', border: '1px solid rgba(21,128,61,0.25)' }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">With TapFlow</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-2xl font-bold text-white">{fmt(results.tapflowRevenue)}</div>
                  <div className="text-emerald-400/60 text-xs">Potential yearly revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">+{results.additionalLeads}</div>
                  <div className="text-emerald-400/60 text-xs">Additional leads/year</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-5" style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-400 font-semibold text-sm">ROI on TapFlow Pro ($10/mo)</span>
              </div>
              <div className="text-4xl font-bold text-white">{results.roi.toLocaleString()}×</div>
              <div className="text-indigo-400/60 text-sm mt-1">Return on your investment</div>
            </div>

            <Link href="/contact"
              className="flex items-center justify-center gap-2 w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-500 transition-colors red-glow group">
              Stop Leaving Money Behind
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
