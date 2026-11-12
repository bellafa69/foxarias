import type { SiteContent } from '@/components/siteContent'

// Hero block for the logistics page. Each piece carries --d (entrance delay)
// and class lg-e; the wrapper's lg-enter class switches the entrance on.
const d = (ms: number) => ({ '--d': `${ms}ms` } as React.CSSProperties)

export default function LogisticsHero({ content }: { content: SiteContent }) {
  const hero = content.hero
  if (!hero) return null

  return (
    <div className="lg-hero">
      <div className="lg-hero-intro">
        <h1 className="lg-hero-headline lg-e" style={d(0)}>{hero.headline}</h1>
        <p className="lg-hero-offer lg-e" style={d(150)}>{hero.offer}</p>
        <div className="lg-e" style={d(300)}>
          <p className="lg-hero-body">{hero.body}</p>
          <div className="lg-hero-proof">
            <div className="lg-hero-label">{hero.experienceLabel}</div>
            <p>{hero.proof}</p>
          </div>
        </div>
      </div>

      <div className="lg-hero-services lg-e" style={d(600)}>
        <div className="lg-hero-label">Services</div>
        <ul>
          {content.skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>

      <div className="lg-hero-contact lg-e" style={d(600)}>
        <div className="lg-hero-invite">{hero.invitation}</div>
        <a className="lg-hero-email" href={`mailto:${content.email}`}>{content.email} <span aria-hidden>→</span></a>
        <div className="lg-hero-support">
          {content.location.map(l => <span key={l}>{l}</span>)}
          <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}
