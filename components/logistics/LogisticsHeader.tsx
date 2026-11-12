'use client'

import Link from 'next/link'
import type { SiteContent } from '@/components/siteContent'

const navText: React.CSSProperties = { fontSize: '16px', lineHeight: '20px', fontWeight: 500, color: 'var(--site-fg)' }

// Header for the logistics page: logo and one-line introduction, visible from
// the first paint (no typing). Once the hero scrolls out of view, the email
// appears on the right so the next step stays one click away.
export default function LogisticsHeader({ content, showEmail }: { content: SiteContent; showEmail: boolean }) {
  return (
    <>
      <header className="nav-desktop-header">
        <div style={{ gridColumn: '1 / 11', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ ...navText, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>FOX ARIAS</Link>
          <span style={{ ...navText, whiteSpace: 'nowrap' }}>{content.tagline}</span>
        </div>
        <a
          href={`mailto:${content.email}`}
          tabIndex={showEmail ? 0 : -1}
          style={{
            gridColumn: '11 / 13', justifySelf: 'end', fontSize: '12px', lineHeight: '16px', fontWeight: 500,
            color: 'var(--site-fg)', textDecoration: 'underline', textUnderlineOffset: '3px',
            opacity: showEmail ? 1 : 0, pointerEvents: showEmail ? 'auto' : 'none', transition: 'opacity 0.2s ease',
          }}
        >
          {content.email}
        </a>
      </header>

      <div
        className="nav-mobile-stack"
        style={{ paddingInline: 'var(--page-padding)', paddingTop: '16px', paddingBottom: '8px', backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}
      >
        <Link href="/" style={{ display: 'block', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--site-fg)', marginBottom: '4px' }}>
          FOX ARIAS
        </Link>
        <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--site-fg)' }}>{content.tagline}</div>
      </div>
    </>
  )
}
