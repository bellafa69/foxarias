'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { LOGISTICS_CONTENT } from '@/components/siteContent'
import LogisticsHeader from './LogisticsHeader'
import LogisticsHero, { LogisticsIntro } from './LogisticsHero'
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
// page, but resets on a reload, so a reload always replays the entrance.
let playedThisSession = false

// Entrance: only the hero text moves (see LogisticsHero), in under 900 ms. The
// header and slideshow are shown immediately; autoplay waits until the entrance
// is done so nothing moves while the text is being read. Reduced motion and
// coming back within the same visit skip the entrance.
export default function LogisticsLanding() {
  const [ready, setReady] = useState(false)
  const [instant, setInstant] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const skip = reduced || playedThisSession
    setInstant(skip)
    setReady(true)
    const t = setTimeout(() => { playedThisSession = true; setPlaying(true) }, skip ? 0 : 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="lg-page" style={darkTokens}>
      <LogisticsHeader content={LOGISTICS_CONTENT} />
      <LogisticsHero content={LOGISTICS_CONTENT} ready={ready} instant={instant} />
      <LogisticsSlideshow autoplay={playing} />
      <LogisticsIntro content={LOGISTICS_CONTENT} />
      <ProblemAccordion />
      <Footer />
    </main>
  )
}
