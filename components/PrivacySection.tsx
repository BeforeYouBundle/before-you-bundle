'use client'

import { motion } from 'framer-motion'

const privacyPoints = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L3 5V8.5C3 12.09 5.56 15.41 9 16.5C12.44 15.41 15 12.09 15 8.5V5L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'We do not display internal system wallets.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="7" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 7V5C6 3.34 7.34 2 9 2C10.66 2 12 3.34 12 5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
    text: 'We only visualize relationships derived from public on-chain data.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 6V9L11 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    text: 'No wallet connect required. Paste addresses and analyze instantly.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M14 6L8 12L4 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Analysis runs client-side. Your data never leaves your browser.',
  },
]

export default function PrivacySection() {
  return (
    <motion.section
      id="privacy"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="px-6 py-20"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-text-primary">Privacy First</h2>
          <p className="mt-2 text-text-secondary">
            Your privacy is our priority. We believe in transparency.
          </p>
        </div>

        {/* Privacy points */}
        <div className="space-y-4">
          {privacyPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 bg-graphite-850/50 border border-white/[0.06] rounded-lg"
            >
              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
                {point.icon}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pt-1.5">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
