'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import InfoSection from '@/components/InfoSection'
import Footer from '@/components/Footer'
import { LOGISTICS_CONTENT } from '@/components/siteContent'
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

export default function LogisticsLanding() {
  const [infoInView, setInfoInView] = useState(true)
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

  return (
    <main style={darkTokens}>
      <div className="mobile-hero-stack">
        <Nav content={LOGISTICS_CONTENT} revealed infoInView={infoInView} animateTagline={false} />
        <div ref={infoRef}>
          <InfoSection content={LOGISTICS_CONTENT} />
        </div>
        <div className="slideshow-motion-wrapper" style={{ marginTop: '80px' }}>
          <LogisticsSlideshow />
        </div>
      </div>
      <ProblemAccordion />
      <Footer />
    </main>
  )
}
