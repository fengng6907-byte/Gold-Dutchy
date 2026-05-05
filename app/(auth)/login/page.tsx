'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gold-gradient rounded-2xl flex items-center justify-center text-2xl shadow-gold duck-bob">
            🦆
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-white">Gold Dutchy</h1>
            <p className="text-white/40 text-xs">Split Smarter, Settle Faster</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-white/40 text-sm mb-7">Sign in to your Gold Dutchy account</p>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Google', icon: '🔵' },
              { label: 'GitHub', icon: '⚫' },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/8 border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/12 transition-all"
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/70 block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/8 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white/70 block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/8 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-gold-500/70 hover:text-gold-400 transition-colors">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold-gradient text-navy-800 font-bold rounded-2xl text-sm shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in to Gold Dutchy 🦆'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-6">
            No account?{' '}
            <Link href="/register" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
