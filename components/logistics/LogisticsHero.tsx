import type { SiteContent } from '@/components/siteContent'

// Hero block for the logistics page. LogisticsLanding opens it above the slideshow.
// Every child is placed on the grid explicitly (see .lg-hero in globals.css) so
// Services can sit beside the offer rather than beside the headline.
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
      <p className="lg-hero-body">{hero.body}</p>
      <p className="lg-hero-proof"><Proof text={hero.proof} /></p>

      <div className="lg-hero-services">
        <div className="lg-hero-label">Services</div>
        <ul>
          {content.skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>

      <div className="lg-hero-contact">
        <div className="lg-hero-invite">{hero.invitation}</div>
        <a className="lg-hero-email" href={`mailto:${content.email}`}>{content.email}</a>
        <div className="lg-hero-support">
          {content.location.map(l => <span key={l}>{l}</span>)}
          <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}
