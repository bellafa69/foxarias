'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function LogisticsLanding() {
  const [heroInView, setHeroInView] = useState(true)
  // The entrance plays once per visitor. Reduced motion and repeat visits see
  // everything immediately. Add ?replay to the URL to see it again.
  const [animate, setAnimate] = useState(true)
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
    let seen = false
    try { seen = window.localStorage.getItem(SEEN_KEY) === '1' } catch {}
    const replay = window.location.search.includes('replay')
    if (reduced || (seen && !replay)) {
      setAnimate(false)
      return
    }
    try { window.localStorage.setItem(SEEN_KEY, '1') } catch {}
  }, [])

  return (
    <main className={`lg-page${animate ? ' lg-enter' : ''}`} style={darkTokens}>
      <LogisticsHeader content={LOGISTICS_CONTENT} showEmail={!heroInView} />
      <div ref={heroRef}>
        <LogisticsHero content={LOGISTICS_CONTENT} />
      </div>
      <div className="lg-slideshow-wrap">
        <LogisticsSlideshow />
      </div>
      <ProblemAccordion />
      <Footer />
    </main>
  )
}
