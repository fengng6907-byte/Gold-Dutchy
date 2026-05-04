import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TapFlow — Turn Every Tap Into a Business Opportunity',
  description: 'TapFlow is a digital identity and lead generation platform. Share contact info via NFC, capture leads automatically, and track every interaction.',
  keywords: 'NFC business card, digital business card, lead generation, sales tool, contact sharing',
  openGraph: {
    title: 'TapFlow — Turn Every Tap Into a Business Opportunity',
    description: 'Share. Capture. Convert. The smart NFC platform for modern professionals.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
