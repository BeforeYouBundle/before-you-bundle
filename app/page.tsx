'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WalletInputCard, { WalletEntry } from '@/components/WalletInputCard'
import GraphPanel from '@/components/GraphPanel'
import PrivacySection from '@/components/PrivacySection'
import Footer from '@/components/Footer'

type AnalysisState = 'idle' | 'loading' | 'done'

export default function Home() {
  // State management
  const [wallets, setWallets] = useState<WalletEntry[]>([])
  const [skipped, setSkipped] = useState<string[]>([])
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle')

  // Handle analyze button click
  const handleAnalyze = useCallback(() => {
    if (wallets.length === 0) return
    
    setAnalysisState('loading')
    
    // Simulate analysis delay (700-1100ms)
    const delay = 700 + Math.random() * 400
    setTimeout(() => {
      setAnalysisState('done')
    }, delay)
  }, [wallets.length])

  // Handle reset to run again
  const handleReset = useCallback(() => {
    setAnalysisState('idle')
  }, [])

  // Handle full clear
  const handleClear = useCallback(() => {
    setWallets([])
    setSkipped([])
    setAnalysisState('idle')
  }, [])

  return (
    <main className="min-h-screen bg-graphite-950">
      {/* Navigation */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Main content area */}
      <AnimatePresence mode="wait">
        {analysisState === 'done' ? (
          <GraphPanel 
            key="graph"
            wallets={wallets} 
            onReset={handleReset} 
          />
        ) : (
          <WalletInputCard
            key="input"
            wallets={wallets}
            setWallets={setWallets}
            skipped={skipped}
            setSkipped={setSkipped}
            onAnalyze={handleAnalyze}
            isLoading={analysisState === 'loading'}
          />
        )}
      </AnimatePresence>

      {/* Privacy section */}
      <PrivacySection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
