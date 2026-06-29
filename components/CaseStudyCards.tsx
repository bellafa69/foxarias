'use client'

import { motion } from 'framer-motion'

const CARDS = [
  { name: 'Fleet Cost & Care', year: '2024', image: '/images/fcc-01.png',     href: '#' },
  { name: 'Tandem Magazine',   year: '2023', image: '/images/tandem-01.png',  href: '#' },
  { name: 'Event Cadence',     year: '2024', image: '/images/cadence-01.png', href: '#' },
  { name: 'Sentri',            year: '2023', image: '/images/sentri-01.png',  href: '#' },
]

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: '#000000',
  letterSpacing: '0em',
}

interface Props {
  started: boolean
}

export default function CaseStudyCards({ started }: Props) {
  return (
    <motion.div
      initial={{ x: '100vw' }}
      animate={{ x: started ? 0 : '100vw' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        display: 'flex',
        gap: '16px',
        paddingLeft: '32px',
        paddingRight: '32px',
        height: '200px',
      }}
    >
      {CARDS.map(card => (
        <a
          key={card.name}
          href={card.href}
          style={{
            flex: 1,
            height: '200px',
            position: 'relative',
            overflow: 'hidden',
            display: 'block',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '32px',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '12px',
              paddingRight: '12px',
            }}
          >
            <span style={labelStyle}>{card.name}</span>
            <span style={labelStyle}>{card.year}</span>
          </div>
        </a>
      ))}
    </motion.div>
  )
}
