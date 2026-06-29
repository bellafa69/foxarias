'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const IMAGES = [
  '/images/Case%20Study%20-%20FCC%20images/FCC%20-%2001.png',
  '/images/Case%20Study%20-%20FCC%20images/FCC%20-%2002.png',
  '/images/Case%20Study%20-%20FCC%20images/FCC%20-%2003.png',
]

const IMAGE_ROW = [...IMAGES, ...IMAGES]

// Staggered heights — variation reads at the bottom edge (top-aligned)
const HEIGHTS = [200, 260, 260, 180, 220, 260]

const COPY = 'The design brief consisted of 7 hours of recordings, screenshots of a failed redesign, and a legacy platform designed circa 2005. This was followed by a flurry of "we need this now" messages, unanswered questions, and lightning fast turnarounds. Screenshot, we need this now — rinse and repeat.'

const metaText: React.CSSProperties = {
  fontSize: '12px', lineHeight: '16px', fontWeight: 500,
  color: '#ffffff', textTransform: 'uppercase', whiteSpace: 'nowrap',
}

export default function FCCCaseStudy() {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null)
  const [descVisible, setDescVisible] = useState(false)

  return (
    <section style={{
      backgroundColor: '#000000',
      paddingTop: '100px',
      paddingBottom: '40px',
      paddingInline: '40px',
    }}>

      {/* Header + sliding description — hover zone */}
      <div
        style={{ marginBottom: '8px' }}
        onMouseEnter={() => setDescVisible(true)}
        onMouseLeave={() => setDescVisible(false)}
      >
        {/* Title + metadata on same line, metadata close to title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500, color: '#ffffff', cursor: 'default', whiteSpace: 'nowrap' }}>
            Fleet, Cost &amp; Care
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={metaText}>(Lead Product Designer / 2026)</span>
            <span style={metaText}>(Client Work)</span>
            <span style={metaText}>(Product Design, UX, Design Systems)</span>
          </div>
        </div>

        {/* Description — slides down on hover, constrained to ~3 of 12 columns */}
        <AnimatePresence>
          {descVisible && (
            <motion.div
              key="desc"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                paddingTop: '12px',
                maxWidth: '25%',
                fontSize: '16px', lineHeight: '24px', fontWeight: 500, color: '#ffffff',
              }}>
                {COPY}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Image row: top-aligned, 75% width, arrow badge in remaining space */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>

        {/* Images — top edges flush */}
        <div style={{ width: '75%', flexShrink: 0, display: 'flex', alignItems: 'flex-start' }}>
          {IMAGE_ROW.map((src, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${HEIGHTS[i]}px`,
                position: 'relative',
                zIndex: hoveredImg === i ? 10 : 1,
                transform: hoveredImg === i ? 'scale(2)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredImg(i)}
              onMouseLeave={() => setHoveredImg(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        {/* Arrow badge — top-aligned to match images */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px',
        }}>
          <span style={metaText}>→</span>
        </div>

      </div>

    </section>
  )
}
