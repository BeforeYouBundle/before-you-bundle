'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, KeyboardEvent } from 'react'
import Chip from './Chip'

export interface WalletEntry {
  id: string
  raw: string
  display: string
  type: 'solana' | 'evm' | 'unknown'
}

interface WalletInputCardProps {
  wallets: WalletEntry[]
  setWallets: (wallets: WalletEntry[]) => void
  skipped: string[]
  setSkipped: (skipped: string[]) => void
  onAnalyze: () => void
  isLoading: boolean
}

// Validate wallet address format
function validateAddress(addr: string): { valid: boolean; type: 'solana' | 'evm' | 'unknown' } {
  const trimmed = addr.trim()
  
  // Solana: base58, typically 32-44 chars
  const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  if (solanaRegex.test(trimmed)) {
    return { valid: true, type: 'solana' }
  }
  
  // EVM: 0x followed by 40 hex chars
  const evmRegex = /^0x[a-fA-F0-9]{40}$/
  if (evmRegex.test(trimmed)) {
    return { valid: true, type: 'evm' }
  }
  
  return { valid: false, type: 'unknown' }
}

// Format display address (first 4...last 4)
function formatDisplay(addr: string): string {
  if (addr.length <= 12) return addr
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function WalletInputCard({ 
  wallets, 
  setWallets, 
  skipped, 
  setSkipped, 
  onAnalyze, 
  isLoading 
}: WalletInputCardProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Process input and add valid wallets
  const processInput = (text: string) => {
    // Split by spaces, commas, newlines
    const parts = text.split(/[\s,]+/).filter(Boolean)
    const newWallets: WalletEntry[] = []
    const newSkipped: string[] = []
    const existingAddrs = new Set(wallets.map(w => w.raw.toLowerCase()))

    for (const part of parts) {
      const trimmed = part.trim()
      if (!trimmed) continue
      
      // Skip duplicates
      if (existingAddrs.has(trimmed.toLowerCase())) continue
      
      const validation = validateAddress(trimmed)
      if (validation.valid) {
        newWallets.push({
          id: generateId(),
          raw: trimmed,
          display: formatDisplay(trimmed),
          type: validation.type,
        })
        existingAddrs.add(trimmed.toLowerCase())
      } else {
        newSkipped.push(trimmed)
      }
    }

    if (newWallets.length > 0) {
      setWallets([...wallets, ...newWallets])
    }
    if (newSkipped.length > 0) {
      setSkipped([...skipped, ...newSkipped])
    }
    setInputValue('')
  }

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    processInput(text)
  }

  // Handle key events
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (inputValue.trim()) {
        processInput(inputValue)
      }
    }
    
    // Backspace removes last chip when input is empty
    if (e.key === 'Backspace' && inputValue === '' && wallets.length > 0) {
      const newWallets = [...wallets]
      newWallets.pop()
      setWallets(newWallets)
    }
  }

  // Remove a wallet
  const removeWallet = (id: string) => {
    setWallets(wallets.filter(w => w.id !== id))
  }

  // Clear all
  const clearAll = () => {
    setWallets([])
    setSkipped([])
    setInputValue('')
    inputRef.current?.focus()
  }

  return (
    <motion.section
      id="how-it-works"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut', delay: 0.4 }}
      className="px-6 pb-12"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-graphite-850 border border-white/[0.08] rounded-card p-6">
          {/* Label */}
          <label 
            htmlFor="wallet-input" 
            className="block text-sm font-medium text-text-primary mb-3"
          >
            Wallets to check
          </label>

          {/* Input area with chips */}
          <div 
            className="min-h-[120px] p-3 bg-graphite-900 border border-white/[0.08] rounded-lg focus-within:border-accent/40 transition-colors duration-200"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              <AnimatePresence mode="popLayout">
                {wallets.map((wallet) => (
                  <Chip
                    key={wallet.id}
                    address={wallet.raw}
                    display={wallet.display}
                    onRemove={() => removeWallet(wallet.id)}
                    onCopy={() => {}}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Textarea */}
            <textarea
              ref={inputRef}
              id="wallet-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              placeholder={wallets.length === 0 ? "Paste wallet addresses here..." : "Add more addresses..."}
              className="w-full bg-transparent resize-none outline-none text-sm text-text-primary placeholder:text-text-muted min-h-[60px]"
              rows={2}
            />
          </div>

          {/* Helper text */}
          <p className="mt-2 text-xs text-text-muted">
            Paste multiple addresses separated by spaces, commas, or newlines. Press Enter to add.
          </p>

          {/* Skipped warning */}
          <AnimatePresence>
            {skipped.length > 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-xs text-amber-500/80 flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {skipped.length} {skipped.length === 1 ? 'entry' : 'entries'} didn&apos;t look like wallet addresses and were skipped.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="mt-5 flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onAnalyze}
              disabled={wallets.length === 0 || isLoading}
              className="px-5 py-2.5 bg-accent hover:bg-accent-light disabled:bg-graphite-700 disabled:cursor-not-allowed text-graphite-950 font-medium text-sm rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                    <path d="M12 2C6.48 2 2 6.48 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Connections'
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={clearAll}
              disabled={wallets.length === 0}
              className="px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Clear
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
