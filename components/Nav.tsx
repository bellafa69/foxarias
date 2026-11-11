'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { HOME_CONTENT, type SiteContent } from './siteContent'

interface Props {
  infoInView?: boolean
  revealed?: boolean
  // Set false on pages reached by navigation (rather than the homepage's
  // initial load) so the tagline doesn't type out again.
  animateTagline?: boolean
  // Mobile only. Set false to drop contact + skills from the mobile stack
  // (logo/tagline still show) — used on case study detail pages, which keep
  // the desktop nav's contact/skills columns untouched via `revealed`.
  showMobileMeta?: boolean
  // Hero copy. Defaults to the homepage copy.
  content?: SiteContent
}

type Col = 'about' | 'contact' | 'skills' | 'upTo'

export default function Nav({ infoInView = true, revealed = true, animateTagline = true, showMobileMeta = true, content = HOME_CONTENT }: Props) {
  const TAGLINE = content.tagline
  const [tagline, setTagline] = useState(animateTagline ? '' : TAGLINE)
  const [activeCol, setActiveCol] = useState<Col | null>(null)
  const [mobileScrolled, setMobileScrolled] = useState(false)

  const navColor = 'var(--site-fg)'
  const navItemInactiveColor = 'var(--site-fg-muted)'

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

  const mobileText: React.CSSProperties = {
    fontSize: '12px', lineHeight: '16px', fontWeight: 500,
    color: 'var(--site-fg)',
  }

  useEffect(() => {
    if (!animateTagline) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setTagline(TAGLINE.slice(0, i))
      if (i >= TAGLINE.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [animateTagline, TAGLINE])

  useEffect(() => {
    if (infoInView) setActiveCol(null)
  }, [infoInView])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) setMobileScrolled(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const enter = (col: Col) => { if (!infoInView) setActiveCol(col) }
  const leave = () => setActiveCol(null)

  const colWrap: React.CSSProperties = {
    display: 'flex', alignItems: 'center', alignSelf: 'stretch', position: 'relative',
  }

  return (
    <>
      {/* ── Desktop nav: sticky 12-column header ── */}
      <header
        className={`nav-desktop-header${mobileScrolled ? ' nav-mobile-hidden' : ''}`}
      >
        {/* Logo + typewriter tagline — cols 1–6. The logo itself doubles as the
            hover trigger for the About dropdown, same mechanics as (CONTACT) etc. */}
        <div
          style={{ gridColumn: '1 / 7', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}
          onMouseEnter={() => enter('about')}
          onMouseLeave={leave}
        >
          <Link href="/" style={{ ...navText, fontWeight: 700, letterSpacing: '-0.02em' }}>FOX ARIAS</Link>
          <span style={navText}>{tagline}</span>

          {revealed && (
            <AnimatePresence>
              {activeCol === 'about' && (
                <motion.div
                  key="about-drop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{ ...dropPanel, width: '380px', whiteSpace: 'normal' }}
                >
                  {content.about.map((para, i) => (
                    <div key={i} style={{ ...dropText, marginTop: i > 0 ? '16px' : 0 }}>
                      {para}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
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
                    {content.location.map(l => <div key={l} style={dropText}>{l}</div>)}
                    <div style={{ height: '28px' }} />
                    {content.contactPrompt.map(l => <div key={l} style={dropText}>{l}</div>)}
                    <div style={{ height: '28px' }} />
                    <a href={`mailto:${content.email}`} style={{ ...dropText, display: 'block' }}>
                      {content.email}
                    </a>
                    <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer" style={{ ...dropText, display: 'block' }}>LinkedIn</a>
                    {content.instagramHref && (
                      <a href={content.instagramHref} target="_blank" rel="noopener noreferrer" style={{ ...dropText, display: 'block' }}>Instagram</a>
                    )}
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
                    {content.skills.map(skill => (
                      <div key={skill} style={dropText}>{skill}</div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {content.upTo && (
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
                      {content.upTo?.map((item, i) => (
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
            )}
          </>
        )}
      </header>

      {/* ── Mobile nav: vertical stacked block ── */}
      <div
        className="nav-mobile-stack"
        style={{
          paddingInline: 'var(--page-padding)',
          paddingTop: '16px',
          paddingBottom: '32px',
          backgroundColor: 'var(--site-bg)',
          color: 'var(--site-fg)',
        }}
      >
        {/* 1. Logo */}
        <Link href="/" style={{ display: 'block', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--site-fg)', marginBottom: '4px' }}>
          FOX ARIAS
        </Link>
        {/* 2. Tagline */}
        <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--site-fg)', marginBottom: '32px' }}>
          {tagline}
        </div>

        {revealed && showMobileMeta && (
          <div style={{ display: 'flex', gap: 'var(--col-gap)' }}>
            {/* 3. Contact */}
            <div style={{ flex: 1 }}>
              {content.location.map(l => <div key={l} style={mobileText}>{l}</div>)}
              <div style={{ height: '16px' }} />
              {content.contactPrompt.map(l => <div key={l} style={mobileText}>{l}</div>)}
              <div style={{ height: '16px' }} />
              <a href={`mailto:${content.email}`} style={{ ...mobileText, display: 'block' }}>
                {content.email}
              </a>
              <a
                href={content.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...mobileText, display: 'block' }}
              >
                LinkedIn
              </a>
              {content.instagramHref && (
                <a
                  href={content.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...mobileText, display: 'block' }}
                >
                  Instagram
                </a>
              )}
            </div>

            {/* 4. Skills — 6 items only on mobile */}
            <div style={{ flex: 1 }}>
              {content.mobileSkills.map(skill => (
                <div key={skill} style={mobileText}>{skill}</div>
              ))}
            </div>
            {/* 5. WHAT I'M UP TO is intentionally omitted on mobile */}
          </div>
        )}
      </div>
    </>
  )
}
