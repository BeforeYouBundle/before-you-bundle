'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="px-6 py-12 border-t border-white/[0.06]"
    >
      <div className="max-w-4xl mx-auto">
        {/* About section (minimal) */}
        <div className="text-center mb-8">
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Before You Bundle helps you verify wallet independence before token launches. 
            Built for transparency in the Web3 ecosystem.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            {/* Mini logo */}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none"
              className="text-accent/60"
            >
              <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="6" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8V12M12 12L7 14M12 12L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Before You Bundle</span>
          </div>

          <p>© {new Date().getFullYear()} All rights reserved</p>

          <p className="text-center sm:text-right">
            For educational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
