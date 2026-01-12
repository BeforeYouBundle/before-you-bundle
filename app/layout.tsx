import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Before You Bundle | Wallet Connection Checker',
  description: 'Check if your wallets are connected before you bundle. Privacy-first on-chain analysis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
