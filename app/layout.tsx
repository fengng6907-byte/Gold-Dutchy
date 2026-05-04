import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TapFlow — The Premium NFC Business Platform',
  description: 'Share contact info instantly via NFC, capture leads automatically, and track every interaction. The smart alternative to Tapt.',
  keywords: 'NFC business card, digital business card, lead generation, Tapt alternative, premium NFC card',
  openGraph: {
    title: 'TapFlow — The Premium NFC Business Platform',
    description: 'Share. Capture. Convert. The intelligent NFC platform for serious professionals.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#EFEFEF] text-[#1A1A1A] font-sans">{children}</body>
    </html>
  )
}
