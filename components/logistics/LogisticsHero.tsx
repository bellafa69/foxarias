import type { SiteContent } from '@/components/siteContent'

// Above the slideshow: the headline and the offer, nothing else. The rest of
// the intro (explanation, proof, services, contact) sits below the slideshow
// in LogisticsDetails.
const EMPHASIS = 'Fleet Cost & Care'

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

export default function LogisticsHero({ content }: { content: SiteContent }) {
  const hero = content.hero
  if (!hero) return null
  return (
    <div className="lg-hero">
      <h1 className="lg-hero-headline">{hero.headline}</h1>
      <p className="lg-hero-offer">{hero.offer}</p>
    </div>
  )
}

export function LogisticsDetails({ content }: { content: SiteContent }) {
  const hero = content.hero
  if (!hero) return null
  return (
    <div className="lg-details">
      <div className="lg-details-text">
        <p className="lg-details-body">{hero.body}</p>
        <p className="lg-details-proof"><Proof text={hero.proof} /></p>
      </div>

      <div>
        <div className="lg-details-label">Services</div>
        <ul>
          {content.skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>

      <div>
        <div className="lg-details-invite">{hero.invitation}</div>
        <a className="lg-details-email" href={`mailto:${content.email}`}>{content.email}</a>
        <div className="lg-details-support">
          {content.location.map(l => <span key={l}>{l}</span>)}
          <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}
