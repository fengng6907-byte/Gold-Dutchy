'use client'

import { useState, useEffect } from 'react'
import { Zap, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Product', href: '/#demo' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-red-600 rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-base font-bold tracking-tight text-white">TapFlow</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href.split('#')[0] && !link.href.includes('#')
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/[0.08]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="relative px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full overflow-hidden group hover:bg-red-500 transition-all duration-200 red-glow-sm"
          >
            <span className="relative z-10">Get Your Card</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(24px)' }}
      >
        <div className="px-6 py-4 space-y-1 border-t border-white/[0.06]">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.06]">
            <Link
              href="/pricing"
              className="block w-full text-center px-4 py-3 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-colors"
            >
              Get Your Card
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
