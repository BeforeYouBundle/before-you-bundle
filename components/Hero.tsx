'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut', delay: 0.1 }}
          className="text-4xl sm:text-5xl font-medium tracking-tight text-text-primary leading-tight text-balance"
        >
          Make sure wallets are not connected before you bundle
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut', delay: 0.18 }}
          className="mt-5 text-lg text-text-secondary"
        >
          Check the bubblemap before you bundle.
        </motion.p>

        {/* Privacy note */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut', delay: 0.26 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-text-muted"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            className="text-accent-muted"
          >
            <path 
              d="M8 1L2 4V7.5C2 11.09 4.56 14.41 8 15.5C11.44 14.41 14 11.09 14 7.5V4L8 1Z" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeLinejoin="round"
            />
            <path 
              d="M5.5 8L7 9.5L10.5 6" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span>Privacy-first. We never expose internal wallets or analysis data.</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.34 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>
      </div>
    </section>
  )
}
