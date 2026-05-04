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
      <div className="w-7 h-7 bg-red-600/20 border border-red-600/30 rounded-full flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-red-500 stroke-[2.5]" />
      </div>
    </div>
  )
  if (value === false) return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <X className="w-3.5 h-3.5 text-zinc-700" />
      </div>
    </div>
  )
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 bg-amber-600/10 border border-amber-600/20 rounded-full flex items-center justify-center">
        <Minus className="w-3.5 h-3.5 text-amber-600" />
      </div>
    </div>
  )
}

export default function Comparison() {
  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-bold text-zinc-500 uppercase tracking-widest mb-5">
            Why TapFlow Wins
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">Not All Cards Are Equal</h2>
          <p className="text-zinc-500">Paper cards are dead. QR codes are halfway there. TapFlow is the complete solution.</p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Header */}
          <div className="grid grid-cols-4" style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="p-4 text-xs font-bold text-zinc-600 uppercase tracking-wider">Capability</div>
            {[
              { label: 'Paper Card', sub: 'Old school' },
              { label: 'QR Code', sub: 'Halfway there' },
              { label: 'TapFlow', sub: 'Complete', highlight: true },
            ].map((col) => (
              <div key={col.label} className={`p-4 text-center relative ${col.highlight ? '' : ''}`}
                style={col.highlight ? { background: 'rgba(220,38,38,0.08)', borderLeft: '1px solid rgba(220,38,38,0.15)' } : {}}>
                {col.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
                )}
                <div className={`font-bold text-sm ${col.highlight ? 'text-red-400' : 'text-zinc-500'}`}>{col.label}</div>
                <div className={`text-xs mt-0.5 ${col.highlight ? 'text-red-600/60' : 'text-zinc-700'}`}>{col.sub}</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className="grid grid-cols-4 hover:bg-white/[0.01] transition-colors"
              style={{ borderBottom: i < features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
            >
              <div className="p-4 text-sm text-zinc-500 flex items-center">{feature.label}</div>
              <div className="p-4 flex items-center"><Cell value={feature.paper} /></div>
              <div className="p-4 flex items-center"><Cell value={feature.qr} /></div>
              <div className="p-4 flex items-center" style={{ background: 'rgba(220,38,38,0.04)', borderLeft: '1px solid rgba(220,38,38,0.08)' }}>
                <Cell value={feature.tapflow} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-5 text-xs text-zinc-700">
          {[
            { icon: <Check className="w-3 h-3 text-red-500" />, label: 'Supported', bg: 'bg-red-600/20 border-red-600/30' },
            { icon: <Minus className="w-3 h-3 text-amber-600" />, label: 'Partial', bg: 'bg-amber-600/10 border-amber-600/20' },
            { icon: <X className="w-3 h-3 text-zinc-700" />, label: 'Not supported', bg: 'border-white/[0.06]' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${item.bg}`}>{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
