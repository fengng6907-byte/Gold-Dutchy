'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    badge: null,
    desc: 'Perfect for trying TapFlow and getting started with digital networking.',
    cta: 'Get Started Free',
    ctaStyle: 'border border-gray-300 text-gray-900 hover:border-brand-400 hover:bg-brand-50',
    features: [
      '1 NFC card',
      'Digital profile page',
      'Basic contact sharing',
      'Up to 50 taps/month',
      'Email support',
      '7-day analytics',
    ],
    locked: ['Lead capture', 'CRM sync', 'Team management', 'Revenue tracking'],
  },
  {
    name: 'Pro',
    price: { monthly: 10, annual: 8 },
    badge: 'Most Popular',
    desc: 'For individual professionals serious about turning every meeting into a lead.',
    cta: 'Start Pro Free',
    ctaStyle: 'bg-gray-900 text-white hover:bg-brand-600 shadow-lg hover:shadow-xl hover:shadow-brand-500/30',
    features: [
      '1 NFC card (premium metal)',
      'Unlimited taps',
      'Full lead capture',
      'Analytics dashboard',
      'CRM integrations',
      'Custom profile domain',
      'Email + SMS notifications',
      'Priority support',
      '90-day history',
    ],
    locked: ['Team management', 'White-label'],
    highlighted: true,
  },
  {
    name: 'Business',
    price: { monthly: 30, annual: 24 },
    badge: 'For Teams',
    desc: 'For sales teams and companies that want to scale performance tracking across the org.',
    cta: 'Start Business Trial',
    ctaStyle: 'border border-gray-300 text-gray-900 hover:border-brand-400 hover:bg-brand-50',
    features: [
      'Up to 10 team members',
      'Everything in Pro',
      'Team analytics dashboard',
      'Admin controls',
      'Centralized billing',
      'White-label branding',
      'Salesforce / HubSpot deep sync',
      'Revenue attribution',
      'Dedicated CSM',
      'Unlimited history',
    ],
    locked: [],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full text-xs font-semibold text-white mb-4">
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Invest Less Than a Business Lunch.
            <br />Get Year-Round Leads.
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-8">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-gray-200 rounded-full">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !annual ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500'
              }`}
            >
              Annual
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20 scale-105 border-2 border-gray-800'
                  : 'bg-white border border-gray-200 hover:border-brand-200 hover:shadow-lg'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    plan.highlighted
                      ? 'bg-brand-500 text-white shadow-lg'
                      : 'bg-gray-900 text-white'
                  }`}>
                    {plan.highlighted && <Zap className="w-3 h-3" />}
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className={`text-sm font-semibold mb-1 ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <div className="text-5xl font-bold">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </div>
                  {plan.price.monthly > 0 && (
                    <div className={`text-sm mb-2 ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                      /month
                    </div>
                  )}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <div className="text-xs text-emerald-400 font-semibold mb-2">
                    Billed ${plan.price.annual * 12}/year · Save ${(plan.price.monthly - plan.price.annual) * 12}/yr
                  </div>
                )}
                <p className={`text-sm leading-relaxed ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`block w-full text-center py-3 rounded-2xl font-semibold text-sm transition-all duration-200 mb-8 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <div className="space-y-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlighted ? 'bg-brand-500' : 'bg-brand-100'
                    }`}>
                      <Check className={`w-2.5 h-2.5 stroke-[3] ${plan.highlighted ? 'text-white' : 'text-brand-600'}`} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-700'}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-bold text-gray-900 text-xl mb-1">Enterprise</div>
            <p className="text-gray-500">
              For large sales orgs, custom NFC card programs, white-label solutions, and volume pricing. Custom contracts, dedicated support, and SLAs.
            </p>
          </div>
          <a
            href="#"
            className="flex-shrink-0 px-6 py-3 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-brand-600 transition-colors"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  )
}
