'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ChipProps {
  address: string
  display: string
  onRemove: () => void
  onCopy: () => void
}

export default function Chip({ address, display, onRemove, onCopy }: ChipProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    onCopy()
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-graphite-700/50 border border-white/[0.08] rounded-chip text-sm font-mono text-text-secondary"
    >
      <span className="select-all">{display}</span>
      
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="p-0.5 hover:text-accent transition-colors duration-200"
        aria-label="Copy address"
        title="Copy full address"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
            <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 4V3.5C10 2.67 9.33 2 8.5 2H3.5C2.67 2 2 2.67 2 3.5V8.5C2 9.33 2.67 10 3.5 10H4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
      </button>

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="p-0.5 hover:text-red-400/80 transition-colors duration-200"
        aria-label="Remove address"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}
