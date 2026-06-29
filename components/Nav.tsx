'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TAGLINE = 'Isabella Fox Arias is a designer and art director.'

const SKILLS = [
  'Product Design', 'UX/UI Design', 'Design Systems', 'Product Strategy',
  'Brand Strategy', 'Art Direction', 'User Research', 'Web Design',
  'Copywriting', 'Prototyping', 'Editorial Design', 'Content Strategy',
]

const UP_TO = [
  { label: "What I'm reading",  value: 'Babel by R.F. Kuang'         },
  { label: "What I'm painting", value: 'The Heroines Journey'         },
  { label: "What I'm writing",  value: "Painter Jess Allen's Shadows" },
]

interface Props {
  infoInView?: boolean
  revealed?: boolean
}

type Col = 'contact' | 'skills' | 'upTo'

export default function Nav({ infoInView = true, revealed = true }: Props) {
  const [tagline, setTagline] = useState('')
  const [activeCol, setActiveCol] = useState<Col | null>(null)

  const navColor = '#ffffff'
  const navItemInactiveColor = 'rgba(255, 255, 255, 0.5)'

  const navText: React.CSSProperties = {
    fontSize: '16px', lineHeight: '20px', fontWeight: 500,
    color: navColor, whiteSpace: 'nowrap',
  }

  const smallText: React.CSSProperties = {
    fontSize: '12px', lineHeight: '16px', fontWeight: 500,
    whiteSpace: 'nowrap',
  }

  const dropText: React.CSSProperties = {
    fontSize: '12px', lineHeight: '16px', fontWeight: 500,
    color: navColor,
  }

  const dropPanel: React.CSSProperties = {
    position: 'absolute', top: '48px', left: 0, width: '100%', padding: '12px 0',
  }

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setTagline(TAGLINE.slice(0, i))
      if (i >= TAGLINE.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (infoInView) setActiveCol(null)
  }, [infoInView])

  const enter = (col: Col) => { if (!infoInView) setActiveCol(col) }
  const leave = () => setActiveCol(null)

  const colWrap: React.CSSProperties = {
    display: 'flex', alignItems: 'center', alignSelf: 'stretch', position: 'relative',
  }

  return (
    <header
      style={{
        position: 'sticky', top: 0, height: '48px',
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: '24px', alignItems: 'center', paddingInline: 'var(--page-padding)',
        zIndex: 50,
      }}
    >
      {/* Logo + typewriter tagline — cols 1–6 */}
      <div style={{ gridColumn: '1 / 7', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ ...navText, fontWeight: 700, letterSpacing: '-0.02em' }}>FOX ARIAS</span>
        <span style={navText}>{tagline}</span>
      </div>

      {revealed && (
        <>
          {/* (CONTACT) — cols 7–8 */}
          <div
            style={{ gridColumn: '7 / 9', ...colWrap }}
            onMouseEnter={() => enter('contact')}
            onMouseLeave={leave}
          >
            <span style={{
              ...smallText,
              color: activeCol === 'contact' ? navColor : navItemInactiveColor,
              textDecoration: activeCol === 'contact' ? 'underline' : 'none',
              textUnderlineOffset: '3px',
            }}>
              (CONTACT)
            </span>
            <AnimatePresence>
              {activeCol === 'contact' && (
                <motion.div
                  key="contact-drop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={dropPanel}
                >
                  <div style={dropText}>Between Barcelona, ES</div>
                  <div style={dropText}>and Brooklyn, New York.</div>
                  <div style={{ height: '28px' }} />
                  <div style={dropText}>For Projects, Jobs,</div>
                  <div style={dropText}>or to talk about books:</div>
                  <div style={{ height: '28px' }} />
                  <a href="mailto:hello@foxarias.com" style={{ ...dropText, display: 'block', textDecoration: 'none' }}>
                    hello@foxarias.com
                  </a>
                  <a href="#" style={{ ...dropText, display: 'block', textDecoration: 'none' }}>LinkedIn</a>
                  <a href="#" style={{ ...dropText, display: 'block', textDecoration: 'none' }}>Instagram</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* (WHAT I CAN DO) — cols 9–10 */}
          <div
            style={{ gridColumn: '9 / 11', ...colWrap }}
            onMouseEnter={() => enter('skills')}
            onMouseLeave={leave}
          >
            <span style={{
              ...smallText,
              color: activeCol === 'skills' ? navColor : navItemInactiveColor,
              textDecoration: activeCol === 'skills' ? 'underline' : 'none',
              textUnderlineOffset: '3px',
            }}>
              (WHAT I CAN DO)
            </span>
            <AnimatePresence>
              {activeCol === 'skills' && (
                <motion.div
                  key="skills-drop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={dropPanel}
                >
                  {SKILLS.map(skill => (
                    <div key={skill} style={dropText}>{skill}</div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* (WHAT I'M UP TO) — cols 11–12 */}
          <div
            style={{ gridColumn: '11 / 13', ...colWrap }}
            onMouseEnter={() => enter('upTo')}
            onMouseLeave={leave}
          >
            <span style={{
              ...smallText,
              color: activeCol === 'upTo' ? navColor : navItemInactiveColor,
              textDecoration: activeCol === 'upTo' ? 'underline' : 'none',
              textUnderlineOffset: '3px',
            }}>
              (WHAT I'M UP TO)
            </span>
            <AnimatePresence>
              {activeCol === 'upTo' && (
                <motion.div
                  key="upTo-drop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={dropPanel}
                >
                  {UP_TO.map((item, i) => (
                    <div key={item.label}>
                      {i > 0 && <div style={{ height: '28px' }} />}
                      <div style={{ ...dropText, opacity: 0.5 }}>{item.label}</div>
                      <div style={dropText}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </header>
  )
}
