'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { LOGISTICS_CONTENT } from '@/components/siteContent'
import LogisticsHeader from './LogisticsHeader'
import LogisticsHero, { LogisticsDetails } from './LogisticsHero'
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

// Module-scoped: survives client-side navigation away from and back to this
// page, but resets on a reload, so a reload always replays the sequence.
let playedThisSession = false

const EASE = [0.2, 0.7, 0.2, 1] as const

// Load sequence: the headline and offer rise in, then the slideshow lifts in
// beneath them and starts playing; the text band fades in as it scrolls into
// view. Reduced motion and coming back within the same visit skip it.
export default function LogisticsLanding() {
  const [ready, setReady] = useState(false)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || playedThisSession) setInstant(true)
    // Flag after the sequence is set up, not before: React's dev double-run of
    // effects would otherwise mark it played and skip it.
    const t = setTimeout(() => { playedThisSession = true }, 1500)
    setReady(true)
    return () => clearTimeout(t)
  }, [])

  const d = (delay: number) => ({ duration: instant ? 0 : 0.8, delay: instant ? 0 : delay, ease: EASE })

  return (
    <main className="lg-page" style={darkTokens}>
      <LogisticsHeader content={LOGISTICS_CONTENT} />
      <motion.div initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={d(0.05)}>
        <LogisticsHero content={LOGISTICS_CONTENT} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={d(0.35)}>
        <LogisticsSlideshow autoplay={ready} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: instant ? 0 : 0.7, ease: EASE }}>
        <LogisticsDetails content={LOGISTICS_CONTENT} />
      </motion.div>
      <ProblemAccordion />
      <Footer />
    </main>
  )
}
