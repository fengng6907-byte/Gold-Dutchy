'use client'

import { useState } from 'react'
import { Play, Pause, Zap, Wifi, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function VideoPlaceholder({ title, sub }: { title: string; sub: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111] group cursor-pointer" onClick={() => setPlaying(!playing)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-900 to-black" />
      {/* Scan lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)', backgroundSize: '100% 3px' }} />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${playing ? 'bg-white/10 scale-90' : 'bg-red-600 group-hover:scale-110'} shadow-xl red-glow`}>
          {playing
            ? <Pause className="w-6 h-6 text-white" />
            : <Play className="w-6 h-6 text-white ml-1" />
          }
        </div>
      </div>

      {/* Label overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">{sub}</div>
        <div className="text-base font-semibold text-white">{title}</div>
      </div>

      {/* Duration badge */}
      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 rounded-md text-xs text-zinc-400 border border-white/[0.08]">
        {playing ? 'Playing' : '2:34'}
      </div>
    </div>
  )
}

function NFCCardMockup() {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-red-600/10 rounded-3xl blur-2xl" />

      {/* Card */}
      <div
        className="relative rounded-2xl p-7 shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #1c1c1c 0%, #111 50%, #0d0d0d 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

        {/* Red accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        <div className="flex items-start justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold text-white/50 tracking-widest">TAPFLOW</span>
          </div>
          {/* NFC symbol */}
          <div className="relative w-10 h-10">
            {[0, 3, 6].map((i) => (
              <div key={i} className="absolute rounded-full border border-white/[0.15]" style={{ inset: `${i}px` }} />
            ))}
            <div className="absolute inset-[18px] bg-red-500/30 rounded-full" />
          </div>
        </div>

        <div>
          <div className="text-xl font-bold text-white tracking-tight">Alex Johnson</div>
          <div className="text-sm text-zinc-500 mt-0.5">VP of Sales · Acme Corp</div>
          <div className="mt-4 text-xs text-zinc-600">tap.tapflow.io/alex</div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xl red-glow-sm flex items-center gap-1.5">
        <Wifi className="w-3 h-3" />
        NFC Ready
      </div>
    </div>
  )
}

function ProfileMockup() {
  return (
    <div className="w-48 rounded-3xl overflow-hidden shadow-2xl border border-white/[0.06]" style={{ background: '#111' }}>
      <div className="h-16 bg-gradient-to-br from-red-700 to-red-900 relative">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
      </div>
      <div className="px-4 pb-4 -mt-7">
        <div className="w-14 h-14 rounded-full border-4 border-[#111] bg-gradient-to-br from-zinc-600 to-zinc-800 mb-2 flex items-center justify-center text-xl">👔</div>
        <div className="font-bold text-white text-sm">Alex Johnson</div>
        <div className="text-xs text-zinc-500 mb-3">VP Sales · Acme Corp</div>
        {['📧 alex@acme.com', '📱 +1 555 0192'].map((item) => (
          <div key={item} className="text-xs text-zinc-400 bg-white/[0.04] rounded-lg px-2 py-1.5 mb-1.5">{item}</div>
        ))}
        <button className="w-full mt-2 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-500 transition-colors">
          Save Contact
        </button>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  return (
    <section className="py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-600/30 bg-red-600/[0.06] text-xs font-bold text-red-500 uppercase tracking-widest mb-5">
            The Product
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            One Card. Infinite Intelligence.
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            A single tap replaces every lead form, business card, and follow-up email you've ever sent.
          </p>
        </div>

        {/* Card + Profile split */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px]">
              <NFCCardMockup />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-semibold text-zinc-400 mb-5">
              What Your Contact Sees
            </div>
            <div className="flex items-start gap-8">
              <ProfileMockup />
              <div className="pt-4 space-y-5">
                {[
                  { num: '01', title: 'Instant Profile', desc: 'Full contact page loads in under 1 second.' },
                  { num: '02', title: 'One-tap Save', desc: 'Saves to native contacts — no friction.' },
                  { num: '03', title: 'Auto Lead Log', desc: 'Lead captured in your dashboard the moment they tap.' },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4">
                    <span className="text-xs font-bold text-red-600 mt-0.5">{item.num}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Videos */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Watch it work</div>
              <h3 className="text-2xl font-bold text-white">Product in Action</h3>
            </div>
            <Link
              href="/pricing"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group"
            >
              Get started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <VideoPlaceholder title="30-Second Tap Demo" sub="Core Product" />
            <VideoPlaceholder title="Dashboard Walkthrough" sub="Analytics" />
            <VideoPlaceholder title="Team Setup Guide" sub="For Teams" />
          </div>
        </div>

      </div>
    </section>
  )
}
