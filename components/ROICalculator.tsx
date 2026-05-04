'use client'

import { useState, useMemo } from 'react'
import { DollarSign, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react'

export default function ROICalculator() {
  const [meetings, setMeetings] = useState(10)
  const [conversion, setConversion] = useState(15)
  const [dealValue, setDealValue] = useState(5000)

  const results = useMemo(() => {
    const weeksPerYear = 52
    const totalMeetings = meetings * weeksPerYear
    const currentLeadsCaptured = totalMeetings * 0.4 // assume 40% captured without TapFlow
    const tapflowLeadsCaptured = totalMeetings * 0.95 // 95% captured with TapFlow

    const currentConversions = currentLeadsCaptured * (conversion / 100)
    const tapflowConversions = tapflowLeadsCaptured * (conversion / 100)

    const currentRevenue = currentConversions * dealValue
    const tapflowRevenue = tapflowConversions * dealValue
    const missed = tapflowRevenue - currentRevenue

    const monthlyMissed = missed / 12
    const roi = Math.round((missed / 120) * 100) // vs $120/year Pro plan

    return {
      missed: Math.round(missed),
      monthlyMissed: Math.round(monthlyMissed),
      tapflowRevenue: Math.round(tapflowRevenue),
      roi,
      additionalLeads: Math.round(tapflowLeadsCaptured - currentLeadsCaptured),
    }
  }, [meetings, conversion, dealValue])

  const formatCurrency = (n: number) =>
    n >= 1000000
      ? `$${(n / 1000000).toFixed(1)}M`
      : n >= 1000
      ? `$${(n / 1000).toFixed(0)}K`
      : `$${n}`

  return (
    <section className="py-28 bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-400 mb-4">
            ROI Calculator
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            How Much Are You Leaving<br />on the Table?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See the exact revenue you're missing by not tracking your contacts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 space-y-8">
            <h3 className="text-white font-bold text-lg">Your Numbers</h3>

            {/* Meetings slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-300">Meetings / week</label>
                <span className="text-brand-400 font-bold text-lg">{meetings}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={meetings}
                onChange={(e) => setMeetings(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>1</span><span>50</span>
              </div>
            </div>

            {/* Conversion slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-300">Close rate</label>
                <span className="text-violet-400 font-bold text-lg">{conversion}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={conversion}
                onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>1%</span><span>50%</span>
              </div>
            </div>

            {/* Deal value */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-300">Avg deal value</label>
                <span className="text-emerald-400 font-bold text-lg">{formatCurrency(dealValue)}</span>
              </div>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>$500</span><span>$100K</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Big miss */}
            <div className="bg-red-950/60 border border-red-800/50 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold text-sm">Revenue You're Missing / Year</span>
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {formatCurrency(results.missed)}
              </div>
              <div className="text-red-300 text-sm">
                That's {formatCurrency(results.monthlyMissed)}/month in uncaptured leads
              </div>
            </div>

            {/* With TapFlow */}
            <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">With TapFlow</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(results.tapflowRevenue)}</div>
                  <div className="text-emerald-300 text-xs">Potential yearly revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">+{results.additionalLeads}</div>
                  <div className="text-emerald-300 text-xs">Additional leads/year</div>
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-brand-900/50 border border-brand-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-brand-400" />
                <span className="text-brand-400 font-semibold text-sm">Your ROI on TapFlow Pro ($10/mo)</span>
              </div>
              <div className="text-4xl font-bold text-white">{results.roi.toLocaleString()}x</div>
              <div className="text-brand-300 text-sm mt-1">Return on your investment</div>
            </div>

            <a
              href="#pricing"
              className="flex items-center justify-center gap-2 w-full py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-brand-50 transition-colors group"
            >
              Stop Leaving Money Behind
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
