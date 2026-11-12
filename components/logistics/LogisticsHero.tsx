'use client'

import { motion } from 'framer-motion'
import type { SiteContent } from '@/components/siteContent'

// Opening: headline, offer and FCC proof on the left; Services on the right,
// aligned with the offer. The header carries identity and contact. Entrance is
// opacity and an 8px rise only (no layout shift), headline first, then the
// offer, then proof and Services; the whole sequence is under 900 ms.
const EMPHASIS = 'Fleet Cost & Care'
const EASE = [0.2, 0.7, 0.2, 1] as const

function Proof({ text }: { text: string }) {
  const i = text.indexOf(EMPHASIS)
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <strong>{EMPHASIS}</strong>
      {text.slice(i + EMPHASIS.length)}
    </>
  )
}

export default function LogisticsHero({ content, ready, instant }: { content: SiteContent; ready: boolean; instant: boolean }) {
  const hero = content.hero
  if (!hero) return null
  const t = (delay: number) => ({ duration: instant ? 0 : 0.45, delay: instant ? 0 : delay, ease: EASE })
  const hidden = { opacity: 0, y: 8 }
  const shown = ready ? { opacity: 1, y: 0 } : hidden
  return (
    <div className="lg-hero">
      <motion.h1 className="lg-hero-headline" initial={hidden} animate={shown} transition={t(0)}>{hero.headline}</motion.h1>
      <motion.p className="lg-hero-offer" initial={hidden} animate={shown} transition={t(0.15)}>{hero.offer}</motion.p>
      <motion.p className="lg-hero-proof" initial={hidden} animate={shown} transition={t(0.3)}><Proof text={hero.proof} /></motion.p>
      <motion.div className="lg-hero-services" initial={hidden} animate={shown} transition={t(0.3)}>
        <div className="lg-hero-services-label">Services</div>
        <ul>
          {content.skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </motion.div>
    </div>
  )
}

// The wider explanation sits between the slideshow and the problem sections.
export function LogisticsIntro({ content }: { content: SiteContent }) {
  if (!content.hero) return null
  return (
    <div className="lg-intro">
      <p>{content.hero.body}</p>
    </div>
  )
}
