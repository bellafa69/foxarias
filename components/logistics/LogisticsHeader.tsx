'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { SiteContent } from '@/components/siteContent'

// Same navigation system as the main site: logo and tagline at 16px, a small
// 12px "(CONTACT)" label that opens its panel on hover, and sticky on scroll.
// The email also sits at the right as a visible, underlined link. Services are
// in the hero on this page, so there is no "(WHAT I CAN DO)" label.
export default function LogisticsHeader({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false)
  const email = (
    <a className="lg-header-email" href={`mailto:${content.email}`}>{content.email}</a>
  )
  return (
    <>
      <header className="nav-desktop-header">
        <div className="lg-header-left">
          <Link href="/" className="lg-logo" style={{ color: 'var(--site-fg)' }}>FOX ARIAS</Link>
          <span className="lg-tagline" style={{ color: 'var(--site-fg)' }}>{content.tagline}</span>
        </div>

        <div
          style={{ gridColumn: '7 / 9', display: 'flex', alignItems: 'center', alignSelf: 'stretch', position: 'relative' }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span className="lg-nav-label" data-open={open}>(CONTACT)</span>
          <AnimatePresence>
            {open && (
              <motion.div
                key="contact-drop"
                className="lg-nav-drop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {content.location.map(l => <div key={l}>{l}</div>)}
                <div style={{ height: '20px' }} />
                {content.contactPrompt.map(l => <div key={l}>{l}</div>)}
                <div style={{ height: '8px' }} />
                <a href={`mailto:${content.email}`}>{content.email}</a>
                <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {content.instagramHref && <a href={content.instagramHref} target="_blank" rel="noopener noreferrer">Instagram</a>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ gridColumn: '10 / 13', justifySelf: 'end', fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}>{email}</div>
      </header>

      <div
        className="nav-mobile-stack"
        style={{ paddingInline: 'var(--page-padding)', paddingTop: '16px', paddingBottom: '8px', backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}
      >
        <Link href="/" style={{ display: 'block', fontSize: '16px', lineHeight: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--site-fg)' }}>
          FOX ARIAS
        </Link>
        <div style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500, color: 'var(--site-fg)', marginTop: '4px' }}>{content.tagline}</div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}>
          {email}
          <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer" className="lg-header-email">LinkedIn</a>
        </div>
      </div>
    </>
  )
}
