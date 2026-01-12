'use client'

import { motion } from 'framer-motion'

// Simple node/hex icon as SVG
const LogoIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-accent"
  >
    <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8.5V12M12 12L7.5 14.5M12 12L16.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-graphite-950/80 border-b border-white/[0.08]"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <LogoIcon />
          <span className="text-text-primary font-medium tracking-tight">
            Before You Bundle
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button (simplified - just shows links are available) */}
        <button 
          className="sm:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </motion.nav>
  )
}
