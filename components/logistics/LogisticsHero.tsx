import type { SiteContent } from '@/components/siteContent'

// Hero block for the logistics page: one headline first, then the offer
// (intro + services), then the proof, then contact. Replaces InfoSection on
// this page and shows at every width (InfoSection is hidden under 1024px).
export default function LogisticsHero({ content }: { content: SiteContent }) {
  const hero = content.hero
  if (!hero) return null

  return (
    <div className="lg-hero">
      <div className="lg-hero-intro">
        <h1 className="lg-hero-headline">{hero.headline}</h1>
        <div className="lg-hero-body">
          {hero.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <p className="lg-hero-proof">{hero.proof}</p>
      </div>

      <div className="lg-hero-services">
        <div className="lg-hero-label">(What I can do)</div>
        <ul>
          {content.skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>

      <div className="lg-hero-contact">
        <div>
          {content.location.map(l => <div key={l}>{l}</div>)}
          {content.contactPrompt.map(l => <div key={l}>{l}</div>)}
        </div>
        <div>
          <a href={`mailto:${content.email}`}>{content.email}</a>
          <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}
