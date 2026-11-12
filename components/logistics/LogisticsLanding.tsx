'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { LOGISTICS_CONTENT } from '@/components/siteContent'
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

// Same load sequence as the homepage: the name and tagline type out first,
// then the hero block and slideshow open up. Typing runs faster than the
// homepage (30ms vs 60ms per character) because this tagline is more than
// twice as long, and the reveal waits for it to finish.
const TYPE_MS = 30
const REVEAL_MS = LOGISTICS_CONTENT.tagline.length * TYPE_MS + 500

export default function LogisticsLanding() {
  const [infoInView, setInfoInView] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = infoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInfoInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setRevealed(true), REVEAL_MS)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <main className="lg-page" style={darkTokens}>
      <div className="mobile-hero-stack">
        <Nav content={LOGISTICS_CONTENT} revealed={revealed} infoInView={infoInView} typeSpeedMs={TYPE_MS} showMobileMeta={false} />
        <motion.div
          ref={infoRef}
          initial={{ height: 0 }}
          animate={{ height: revealed ? 'auto' : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <LogisticsHero content={LOGISTICS_CONTENT} />
        </motion.div>
        <motion.div
          className="slideshow-motion-wrapper"
          initial={{ marginTop: 0 }}
          animate={{ marginTop: revealed ? '80px' : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {revealed ? <LogisticsSlideshow /> : <div className="lg-slideshow" aria-hidden />}
        </motion.div>
      </div>
      <ProblemAccordion />
      <Footer />
    </main>
  )
}
