import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TypedText from '@/components/TypedText'

const img = (n: string) => `/images/FCC - Case Study/FCC - CS - ${n}.png`

// Fixed 16px side padding for this page, independent of the sitewide
// --page-padding var (32px desktop / 16px mobile).
const SIDE_PADDING = '16px'

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

// Pull-quote below the metadata line — lighter weight, white. 30% larger
// than the previous 24px/36px pass, and pushed down another 25% from the
// previous 8px gap above it.
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
// `tall` doubles the frame height — the foreground screenshot scales up with
// it automatically since it's sized with object-fit: contain inside the same
// insets.
function FullBleedImage({ background, foreground, caption, tall = false }: { background: string; foreground: string; caption: string; tall?: boolean }) {
  return (
    <div style={{ paddingInline: SIDE_PADDING }}>
      <div style={{ position: 'relative', height: tall ? '160vh' : '80vh', borderRadius: '8px', overflow: 'hidden' }}>
        <Image src={background} alt="" fill sizes="100vw" quality={90} style={{ objectFit: 'cover' }} />
        <div className="cs-foreground-inset" style={{ position: 'absolute', top: '80px', bottom: '80px', left: 'calc(100% / 6)', right: 'calc(100% / 6)' }}>
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

export default function FCCCaseStudyPage() {
  return (
    <main className="cs-detail-page" style={{ backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}>
      <Nav revealed infoInView={false} animateTagline={false} showMobileMeta={false} />

      {/* Title block — same number+title treatment as the homepage case
          study list. Title, metadata, and quote all align to the hero
          image's left edge (not the column-4 indent used by body text
          further down the page). */}
      <div style={{ paddingTop: '40px', paddingBottom: '48px', paddingInline: SIDE_PADDING }}>
        <div className="cs-title-row" style={{ marginBottom: '8px' }}>
          <span style={{ ...bigTitleText, marginRight: '20px' }}>01</span>
          <span style={bigTitleText}>Fleet, Cost &amp; Care</span>
        </div>

        <div className="cs-metadata-row">
          <span style={metaText}>Lead Product Designer</span>
          <span style={metaText}>2026</span>
          <span style={metaText}>Client Work</span>
          <span style={metaText}>Product Design, UX, Design Systems</span>
        </div>

        <TypedText className="cs-pull-quote" style={pullQuoteText} text="A full-scale redesign for a Fleet management platform." />
      </div>

      <div className="cs-detail-sections" style={{ display: 'flex', flexDirection: 'column', gap: '120px', paddingBottom: '120px' }}>

        {/* 2. Hero image */}
        <FullBleedImage
          background={img('Painting 01')}
          foreground={img('01')}
          caption="QUOTE LISTING / BEFORE AND AFTER"
        />

        {/* 3. Situation / Diagnosis / Approach — each 3 columns wide */}
        <GridSection>
          <TextColumn
            start={4}
            label="The Situation"
            paragraphs={[
              "The design brief consisted of 7 hours of recordings, screenshots of a failed redesign, and a legacy platform designed circa 2005. This was followed by tight deadlines and many unanswered questions. A theme of the project was ‘we need this now.’",
              "Fleet, Cost & Care is a fleet and maintenance management company out of America’s Midwest. The project consisted of the original stakeholders, 20 developers, and me. I was the product designer, the UX strategist, and the product manager all in one.",
            ]}
          />
          <TextColumn
            start={7}
            label="The Diagnosis"
            paragraphs={[
              "The real issue was that it lacked any semblance of information hierarchy. The user had clearly not been taken into consideration and because of that, the system architecture was a haphazard jumble of fields, popups, and endless meandering user flows.",
            ]}
          />
          <TextColumn
            start={10}
            label="The Approach"
            paragraphs={[
              "The solution started with a dissection. Slowly piecing through the seven hours of recordings, noting user pain points, key flows, and repeating patterns. Next was putting together a rough map of how everything fit together, then optimizing those patterns for the user. Key screens were then broken down into their smallest parts and rebuilt based on clear logic. The visual language came last, designed to bring calm and order to a system built on chaos.",
            ]}
          />
        </GridSection>

        {/* 4. Schedule image */}
        <FullBleedImage
          background={img('Painting 02')}
          foreground={img('02')}
          caption="SCHEDULE DESIGNS"
        />

        {/* 5. Work — each 3 columns wide */}
        <GridSection>
          <TextColumn
            start={4}
            label="The Work: The Schedule"
            paragraphs={[
              "It combined three schedule types (employee, equipment, job) with a split screen listing and schedule model. The original screen was rife with random icons and unexplained color systems. First the structure was built so the listing could coexist with the schedule blocks without causing visual chaos. Next, the design language was built from scratch: 8 job statuses, 14 icon indicators, 3 bar statuses, 3 status markers, 3 e-ticket statuses, all organized into a proper legend system.",
            ]}
          />
          <TextColumn
            start={7}
            label="The Work: Quote Screens"
            paragraphs={[
              "The quote screens were an excellent example of what exactly was wrong with the platform. They acted as a pattern for many of the other features, yet there was no clear organization. The challenge was to reorganize the flow by user logic, while adhering to dev constraints, and appeasing the power users. The solution was structural. A column grid to impose order, inline editing to reduce context switching, and a sticky header so users never lost their place.",
            ]}
          />
        </GridSection>

        {/* 6. Quote designs image — double height, updated device screenshot */}
        <FullBleedImage
          background={img('Painting 03')}
          foreground={img('05')}
          caption="QUOTE DESIGNS"
          tall
        />

        {/* 7. Outcome — 3 columns wide */}
        <GridSection>
          <TextColumn
            start={4}
            label="The Outcome"
            paragraphs={[
              "Compared to the previous delivery, which was a year and a half in the making, the final delivery was made in 3.5 months, mid September to mid December. The client was thrilled and continued to say what a great improvement it was on the original.",
            ]}
          />
        </GridSection>

        {/* 8. Mobile designs image — double height */}
        <FullBleedImage
          background={img('Painting 04')}
          foreground={img('04')}
          caption="MOBILE DESIGNS - BEFORE/AFTER"
          tall
        />

      </div>

      <Footer />
    </main>
  )
}
