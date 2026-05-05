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
  title: 'Gold Dutchy — Split Smarter, Settle Faster',
  description: 'The intelligent expense-sharing platform for friends, trips, roommates & teams. Beautiful balance tracking with AI-powered categorization.',
  keywords: 'expense sharing, split bills, group expenses, money tracking, Gold Dutchy, settle debts',
  openGraph: {
    title: 'Gold Dutchy — Split Smarter, Settle Faster',
    description: 'The intelligent expense-sharing platform with AI-powered categorization and visual debt graphs.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-cream-100 text-navy-800 font-sans">
        {children}
      </body>
    </html>
  )
}
