'use client'

import { Check, X, Minus } from 'lucide-react'

const features = [
  { label: 'Share contact instantly', paper: false, qr: 'partial', tapflow: true },
  { label: 'Works without internet', paper: true, qr: false, tapflow: true },
  { label: 'No app needed', paper: true, qr: 'partial', tapflow: true },
  { label: 'Auto lead capture', paper: false, qr: false, tapflow: true },
  { label: 'CRM sync', paper: false, qr: false, tapflow: true },
  { label: 'Analytics & tracking', paper: false, qr: false, tapflow: true },
  { label: 'Revenue attribution', paper: false, qr: false, tapflow: true },
  { label: 'Update info instantly', paper: false, qr: 'partial', tapflow: true },
  { label: 'Team management', paper: false, qr: false, tapflow: true },
  { label: 'Professional impression', paper: 'partial', qr: 'partial', tapflow: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return (
    <div className="flex justify-center">
      <div className="w-7 h-7 bg-brand-100 rounded-full flex items-center justify-center">
        <Check className="w-4 h-4 text-brand-600 stroke-[2.5]" />
      </div>
    </div>
  )
  if (value === false) return (
    <div className="flex justify-center">
      <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
        <X className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 bg-amber-50 rounded-full flex items-center justify-center">
        <Minus className="w-4 h-4 text-amber-500" />
      </div>
    </div>
  )
}

export default function Comparison() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-4">
            Why TapFlow Wins
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Not All Cards Are Equal
          </h2>
          <p className="text-xl text-gray-500">
            Paper cards are dead. QR codes are halfway there. TapFlow is the complete solution.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
          {/* Header row */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-5 text-sm font-semibold text-gray-500">Capability</div>
            {[
              { label: 'Paper Card', sub: 'Old school', bg: 'bg-gray-50', text: 'text-gray-700' },
              { label: 'QR Code', sub: 'Halfway there', bg: 'bg-amber-50', text: 'text-amber-800' },
              { label: 'TapFlow', sub: 'Complete solution', bg: 'bg-brand-600', text: 'text-white', highlighted: true },
            ].map((col) => (
              <div
                key={col.label}
                className={`p-5 text-center ${col.bg} ${col.highlighted ? 'relative' : ''}`}
              >
                {col.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Best Choice
                  </div>
                )}
                <div className={`font-bold text-base ${col.text}`}>{col.label}</div>
                <div className={`text-xs mt-0.5 ${col.highlighted ? 'text-brand-200' : 'text-gray-500'}`}>
                  {col.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className={`grid grid-cols-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                i === features.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <div className="p-4 pl-5 text-sm font-medium text-gray-700 flex items-center">
                {feature.label}
              </div>
              <div className="p-4 flex items-center">
                <Cell value={feature.paper} />
              </div>
              <div className="p-4 flex items-center">
                <Cell value={feature.qr} />
              </div>
              <div className="p-4 flex items-center bg-brand-50/30">
                <Cell value={feature.tapflow} />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          {[
            { icon: <Check className="w-3 h-3 text-brand-600" />, label: 'Fully supported', bg: 'bg-brand-100' },
            { icon: <Minus className="w-3 h-3 text-amber-500" />, label: 'Partial support', bg: 'bg-amber-50' },
            { icon: <X className="w-3 h-3 text-gray-400" />, label: 'Not supported', bg: 'bg-gray-100' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 ${item.bg} rounded-full flex items-center justify-center`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
