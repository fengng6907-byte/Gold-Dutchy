'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { sendContactEmail, type FormState } from '@/app/contact/actions'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const roles = ['Salesperson', 'Real Estate Agent', 'Founder / Entrepreneur', 'Sales Manager', 'Marketing', 'Other']

const inputClass = `w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-zinc-600 outline-none transition-all duration-200
  focus:border-red-600/50 focus:ring-2 focus:ring-red-600/10`

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-500 transition-all duration-200 red-glow disabled:opacity-60 disabled:cursor-not-allowed group"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send Message
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </>
      )}
    </button>
  )
}

export default function ContactForm() {
  const [state, action] = useFormState<FormState, FormData>(sendContactEmail, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} className="space-y-4">

      {/* Name + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Full Name *</label>
          <input
            name="name"
            required
            placeholder="Alex Johnson"
            className={inputClass}
            style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Work Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="alex@company.com"
            className={inputClass}
            style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
          />
        </div>
      </div>

      {/* Company + Role row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Company</label>
          <input
            name="company"
            placeholder="Acme Corp"
            className={inputClass}
            style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Your Role</label>
          <select
            name="role"
            className={inputClass + ' cursor-pointer'}
            style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <option value="">Select role…</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your team, use case, or what you'd like to know…"
          className={inputClass + ' resize-none'}
          style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)' }}
        />
      </div>

      {/* Status messages */}
      {state && (
        <div
          className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
            state.success
              ? 'bg-emerald-600/10 border border-emerald-600/25 text-emerald-400'
              : 'bg-red-600/10 border border-red-600/25 text-red-400'
          }`}
        >
          {state.success
            ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          }
          {state.message}
        </div>
      )}

      {/* Submit */}
      <SubmitButton />

      <p className="text-xs text-center text-zinc-700">
        We respond within 24 hours · Or email us at{' '}
        <a href="mailto:fengng6907@gmail.com" className="text-zinc-500 hover:text-red-500 transition-colors">
          fengng6907@gmail.com
        </a>
      </p>
    </form>
  )
}
