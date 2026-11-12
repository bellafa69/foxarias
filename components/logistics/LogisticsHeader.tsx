import Link from 'next/link'
import type { SiteContent } from '@/components/siteContent'

// Same system as the main site nav: logo and tagline at 16px, sticky on
// scroll. The email sits at the right as a visible, underlined link. Contact
// details and Services live in the hero, under the same parenthesised titles
// the main site uses.
export default function LogisticsHeader({ content }: { content: SiteContent }) {
  const email = <a className="lg-header-email" href={`mailto:${content.email}`}>{content.email}</a>
  return (
    <>
      <header className="nav-desktop-header">
        <div className="lg-header-left">
          <Link href="/" className="lg-logo" style={{ color: 'var(--site-fg)' }}>FOX ARIAS</Link>
          <span className="lg-tagline" style={{ color: 'var(--site-fg)' }}>{content.tagline}</span>
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
