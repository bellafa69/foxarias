'use client'

import Link from 'next/link'
import type { SiteContent } from '@/components/siteContent'

// Header for the logistics page: logo and one-line introduction lead. The
// email sits on the same line at the right, smaller and muted so it is always
// there without competing. The header is sticky, so it stays on scroll.
export default function LogisticsHeader({ content }: { content: SiteContent }) {
  return (
    <>
      <header className="nav-desktop-header">
        <div style={{ gridColumn: '1 / 10', display: 'flex', alignItems: 'baseline', gap: '20px', minWidth: 0 }}>
          <Link href="/" style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--site-fg)', whiteSpace: 'nowrap' }}>FOX ARIAS</Link>
          <span style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500, color: 'var(--site-fg)', whiteSpace: 'nowrap' }}>{content.tagline}</span>
        </div>
        <a
          className="lg-header-email"
          href={`mailto:${content.email}`}
          style={{ gridColumn: '10 / 13', justifySelf: 'end', fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
        >
          {content.email}
        </a>
      </header>

      <div
        className="nav-mobile-stack"
        style={{ paddingInline: 'var(--page-padding)', paddingTop: '16px', paddingBottom: '8px', backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}
      >
        <Link href="/" style={{ display: 'block', fontSize: '16px', lineHeight: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--site-fg)' }}>
          FOX ARIAS
        </Link>
        <div style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500, color: 'var(--site-fg)', marginTop: '4px' }}>{content.tagline}</div>
        <a className="lg-header-email" href={`mailto:${content.email}`} style={{ display: 'inline-block', marginTop: '4px', fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}>{content.email}</a>
      </div>
    </>
  )
}
