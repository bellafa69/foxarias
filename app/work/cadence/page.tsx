import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TypedText from '@/components/TypedText'

const painting = (n: string) => `/images/cadence/Cadence - Painting - ${n}.png`
const device = (n: string) => `/images/cadence/Cadence - Device - ${n}.png`

// Fixed 40px side padding for this page, independent of the sitewide
// --page-padding var (32px desktop / 16px mobile). Matches app/work/fcc/page.tsx.
const SIDE_PADDING = '40px'

// Every text block is exactly 3 of the 12 grid columns wide. Rows place
// blocks back to back starting at column 4 (col4-6, col7-9, col10-12).
const COL_SPAN = 3

// Exact same size/weight/spacing as CaseStudyLarge's bigTitleText, used for
// the number+title on the homepage case study list.
const bigTitleText: React.CSSProperties = {
  fontSize: '48px',
  lineHeight: '56px',
  fontWeight: 500,
  letterSpacing: '-0.02em',
}

// Pull-quote below the metadata line — lighter weight, white.
const pullQuoteText: React.CSSProperties = {
  fontSize: '31px',
  lineHeight: '47px',
  fontWeight: 400,
  color: 'var(--site-fg)',
  margin: 0,
  marginTop: '10px',
}

// Same metadata treatment as CaseStudyLarge's heroImages variant — muted,
// uppercase, 12px.
const metaText: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: 'var(--site-fg-muted)',
  whiteSpace: 'nowrap',
}

const captionText: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'var(--site-fg-muted)',
  textAlign: 'center',
  marginTop: '16px',
}

const columnLabel: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  opacity: 0.5,
  marginBottom: '16px',
}

const columnBody: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: 400,
  margin: 0,
}

// Same background (cover) + foreground (contain, inset 80px / 1-6th) layering
// used by CaseStudyLarge's heroImages variant, for a single full-bleed slot.
function FullBleedImage({ background, foreground, caption }: { background: string; foreground: string; caption: string }) {
  return (
    <div style={{ paddingInline: SIDE_PADDING }}>
      <div style={{ position: 'relative', height: '80vh', borderRadius: '8px', overflow: 'hidden' }}>
        <Image src={background} alt="" fill sizes="100vw" quality={90} style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '80px', bottom: '80px', left: 'calc(100% / 6)', right: 'calc(100% / 6)' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={foreground} alt="" fill sizes="75vw" quality={90} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
      <p style={captionText}>{caption}</p>
    </div>
  )
}

// A single text block, exactly 3 grid columns wide, placed at `start`
// (a 1-indexed column number within the parent's 12-col grid).
function TextColumn({ label, paragraphs, start }: { label: string; paragraphs: string[]; start: number }) {
  return (
    <div className="fcc-col-item" style={{ gridColumn: `${start} / ${start + COL_SPAN}` }}>
      <div style={columnLabel}>{label}</div>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ ...columnBody, marginBottom: i < paragraphs.length - 1 ? '20px' : 0 }}>{p}</p>
      ))}
    </div>
  )
}

// 12-column grid — children (TextColumn or any fcc-col-item) place themselves
// via gridColumn. Stacks to a single full-width column at the existing
// ≤1024px breakpoint (see .fcc-grid / .fcc-col-item in globals.css).
function GridSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fcc-grid"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: 'var(--col-gap)', rowGap: '48px', paddingInline: SIDE_PADDING }}
    >
      {children}
    </div>
  )
}

export default function CadenceCaseStudyPage() {
  return (
    <main style={{ backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}>
      <Nav revealed infoInView={false} animateTagline={false} />

      {/* Title block — same number+title treatment as the homepage case
          study list. Title, metadata, and quote all align to the hero
          image's left edge (not the column-4 indent used by body text
          further down the page). */}
      <div style={{ paddingTop: '40px', paddingBottom: '48px', paddingInline: SIDE_PADDING }}>
        <div className="cs-title-row" style={{ marginBottom: '8px' }}>
          <span style={{ ...bigTitleText, marginRight: '20px' }}>02</span>
          <span style={bigTitleText}>Event Cadence</span>
        </div>

        <div className="cs-metadata-row">
          <span style={metaText}>Lead Product Designer</span>
          <span style={metaText}>2019–2026</span>
          <span style={metaText}>Client Work</span>
          <span style={metaText}>Product Design, UX, Design Systems</span>
        </div>

        <TypedText style={pullQuoteText} text="Managed end-to-end design process for Cadence, an Event management app that required constant feature development, brand iteration, and UX/UI maintenance." />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '120px', paddingBottom: '120px' }}>

        {/* Hero image */}
        <FullBleedImage
          background={painting('01')}
          foreground={device('01')}
          caption="CUSTOMER PROFILE DESIGNS"
        />

        {/* Situation / Diagnosis / Approach — each 3 columns wide */}
        <GridSection>
          <TextColumn
            start={4}
            label="The Situation"
            paragraphs={[
              "I started working at Event Cadence at 23 with no experience in product design. Design systems, components, user flows, everything was new to me.",
              "Cadence was a large scale events platform both on web and app with over 20 constantly evolving features. It was used primarily by medical companies to organize conferences and congresses. I would end up staying for six and a half years.",
            ]}
          />
          <TextColumn
            start={7}
            label="The Diagnosis"
            paragraphs={[
              "The Cadence product was never thought of as a whole and finding the underlying thread — why this and why now — was next to impossible. Many of the requests were based on the late night thoughts of our founder with a short and abstract brief. The result was a platform that was disjointed, unorganized, and difficult to navigate. My role was to advocate for order and clarity.",
            ]}
          />
          <TextColumn
            start={10}
            label="The Approach"
            paragraphs={[
              "I developed my process in a constant state of push and pull with product, development, marketing, and leadership. I built my own briefs on loose information, asked an excessive amount of questions, and worked on rough approximations until conceptual clarity was achieved. I was then able to develop the designs, defining interaction states, edge cases, animations, building a prototype, and eventually sending off to dev with the accompanying dev notes.",
            ]}
          />
        </GridSection>

        {/* Second image */}
        <FullBleedImage
          background={painting('02')}
          foreground={device('02')}
          caption="SCHEDULE DESIGNS"
        />

        {/* Work — each 3 columns wide */}
        <GridSection>
          <TextColumn
            start={4}
            label="The Work: Customer Profile"
            paragraphs={[
              "The original customer profile provided minimal information. Users had to hunt for everything within the database-like environment. The final updated design transformed the profile into a relationship and intelligence hub: customer identity, engagement timeline, attendance behavior, analytics, and external source integrations all in one profile.",
            ]}
          />
          <TextColumn
            start={7}
            label="The Work: Customer Portal"
            paragraphs={[
              "The customer portal was created to allow non-Cadence users to access a stripped-back version of the Cadence appointments system. Without downloading the full app, the customer could see all their appointments and pertinent information, and quickly get in touch with event organizers. The design challenge was to take the expansive and complicated appointments feature and distill it into its simplest form.",
            ]}
          />
        </GridSection>

        {/* Third image */}
        <FullBleedImage
          background={painting('03')}
          foreground={device('03')}
          caption="CUSTOMER PORTAL DESIGNS"
        />

        {/* Outcome — 3 columns wide */}
        <GridSection>
          <TextColumn
            start={4}
            label="The Outcome"
            paragraphs={[
              "When I joined Cadence, the system was scattered and outdated. The designs were reminiscent of the early days of UX/UI design. When I left, Cadence was left with a suite of beautifully designed features, a succinct design system, an updated brand, and a product that had care in the details. On a personal level, I figured out how to succeed in a disorganized, fast-paced environment and more importantly, how to maintain my personal standards in the face of progress for progress' sake.",
            ]}
          />
        </GridSection>

        {/* Mobile designs image */}
        <FullBleedImage
          background={painting('04')}
          foreground={device('04')}
          caption="APPOINTMENTS DESIGNS"
        />

      </div>

      <Footer />
    </main>
  )
}
