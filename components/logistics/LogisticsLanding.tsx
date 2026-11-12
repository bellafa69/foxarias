'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { LOGISTICS_CONTENT } from '@/components/siteContent'
import LogisticsHeader from './LogisticsHeader'
import LogisticsHero from './LogisticsHero'
import LogisticsSlideshow from './LogisticsSlideshow'
import ProblemAccordion from './ProblemAccordion'

// Dark at every width: the site flips to a light scheme below 1024px, so this
// page pins the dark tokens on its own wrapper.
const darkTokens = {
  '--site-bg': '#000000',
  '--site-fg': '#ffffff',
  '--site-fg-muted': 'rgba(255, 255, 255, 0.5)',
  backgroundColor: '#000000',
  color: '#ffffff',
} as React.CSSProperties

const SEEN_KEY = 'lg-hero-seen'
const HOLD_MS = 1500

export default function LogisticsLanding() {
  const [heroInView, setHeroInView] = useState(true)
  // Load sequence: the slideshow fills the screen for HOLD_MS, then the intro
  // opens above it and pushes it down. Reduced motion, repeat visits and
  // phones go straight to the final layout. Add ?replay to see it again.
  const [revealed, setRevealed] = useState(false)
  const [instant, setInstant] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const phone = window.matchMedia('(max-width: 1024px)').matches
    let seen = false
    try { seen = window.localStorage.getItem(SEEN_KEY) === '1' } catch {}
    const replay = window.location.search.includes('replay')
    if (reduced || phone || (seen && !replay)) {
      setInstant(true)
      setRevealed(true)
      return
    }
    try { window.localStorage.setItem(SEEN_KEY, '1') } catch {}
    const timeout = setTimeout(() => setRevealed(true), HOLD_MS)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <main className="lg-page" style={darkTokens}>
      <LogisticsHeader content={LOGISTICS_CONTENT} showEmail={revealed && !heroInView} />
      <motion.div
        ref={heroRef}
        initial={{ height: 0 }}
        animate={{ height: revealed ? 'auto' : 0 }}
        transition={{ duration: instant ? 0 : 1, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: instant ? 0 : 0.6, delay: instant ? 0 : 0.35 }}
        >
          <LogisticsHero content={LOGISTICS_CONTENT} />
        </motion.div>
      </motion.div>
      <LogisticsSlideshow autoplay={revealed} />
      <ProblemAccordion />
      <Footer />
    </main>
  )
}
