import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TypedText from '@/components/TypedText'

const img = (n: string) => `/images/Tandem - Case Study/Tandem - ${n}.png`

// Fixed 16px side padding for this page, independent of the sitewide
// --page-padding var (32px desktop / 16px mobile). Matches FCC/Cadence.
const SIDE_PADDING = '16px'

// Every text block is exactly 3 of the 12 grid columns wide, starting at
// column 4. Matches FCC/Cadence.
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

const columnBody: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: 400,
  margin: 0,
}

// Credit line under the closing paragraph — smaller, muted.
const creditText: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: '20px',
  fontWeight: 400,
  color: 'var(--site-fg-muted)',
  margin: 0,
  marginTop: '16px',
}

// Same background (cover) + foreground (contain, inset 80px / 1-6th) layering
// used by CaseStudyLarge's heroImages variant, for a single full-bleed slot.
function FullBleedImage({ background, foreground }: { background: string; foreground: string }) {
  return (
    <div style={{ paddingInline: SIDE_PADDING }}>
      <div style={{ position: 'relative', height: '80vh', borderRadius: '8px', overflow: 'hidden' }}>
        <Image src={background} alt="" fill sizes="100vw" quality={90} style={{ objectFit: 'cover' }} />
        <div className="cs-foreground-inset" style={{ position: 'absolute', top: '80px', bottom: '80px', left: 'calc(100% / 6)', right: 'calc(100% / 6)' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src={foreground} alt="" fill sizes="75vw" quality={90} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// A single image or video with no painting/background layer — full width at
// its own natural aspect ratio (same side padding as the painting images),
// rather than cropped or letterboxed into a fixed-height box.
function FullWidthMedia({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingInline: SIDE_PADDING }}>
      {children}
    </div>
  )
}

// A single text block, exactly 3 grid columns wide, placed at `start`
// (a 1-indexed column number within the parent's 12-col grid). No label —
// used for the plain body paragraphs between images.
function BodyText({ paragraphs, start = 4 }: { paragraphs: string[]; start?: number }) {
  return (
    <div className="fcc-col-item" style={{ gridColumn: `${start} / ${start + COL_SPAN}` }}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ ...columnBody, marginBottom: i < paragraphs.length - 1 ? '20px' : 0 }}>{p}</p>
      ))}
    </div>
  )
}

// 12-column grid — children (BodyText or any fcc-col-item) place themselves
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

export default function TandemCaseStudyPage() {
  return (
    <main className="cs-detail-page" style={{ backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}>
      <Nav revealed infoInView={false} animateTagline={false} showMobileMeta={false} />

      {/* Title block — same number+title treatment as the homepage case
          study list. Title, metadata, and quote align to the page edge (not
          the column-4 indent used by body text further down the page). */}
      <div style={{ paddingTop: '40px', paddingBottom: '48px', paddingInline: SIDE_PADDING }}>
        <div className="cs-title-row" style={{ marginBottom: '8px' }}>
          <span style={{ ...bigTitleText, marginRight: '20px' }}>04</span>
          <span style={bigTitleText}>Tandem Magazine</span>
        </div>

        <div className="cs-metadata-row">
          <span style={metaText}>Co-Founder / Art Director</span>
          <span style={metaText}>2025-Present</span>
          <span style={metaText}>Personal Project</span>
          <span style={metaText}>Publishing, Art Direction, Editorial</span>
        </div>

        <TypedText className="cs-pull-quote" style={pullQuoteText} text="Co-editor and co-founder of Tandem Magazine, an art magazine focusing on a transhistoric perspective for contemporary art." />
      </div>

      <div className="cs-detail-sections" style={{ display: 'flex', flexDirection: 'column', gap: '120px', paddingBottom: '120px' }}>

        {/* Image 1 */}
        <FullBleedImage
          background={img('Painting - 1')}
          foreground={img('Image - 1')}
        />

        {/* Paragraph 1 + Paragraph 2 — side by side below the first image */}
        <GridSection>
          <BodyText
            start={4}
            paragraphs={[
              "Tandem was built out of frustration. My co-founder, Dr. Eliza Goodpasture, and I were tired of being freelance arts writers. Research, pitch, rejection, repeat. Sometimes it seemed to be just a numbers game. Tandem was created so we could write pieces that focus on undervalued and spectacular contemporary artists, all in conversation with historical art. At Tandem, historical art would always be at the center of the work, not as a footnote.",
            ]}
          />
          <BodyText
            start={7}
            paragraphs={[
              "Tandem evolved into a weekly digital publication, featuring artist interviews, opinion pieces, and a monthly bulletin detailing what we thought about art at the moment. Outside of our digital work, last fall I created the first Tandem event: Tandem x ESSELL presents Tomas Pintos.",
            ]}
          />
        </GridSection>

        {/* Image 2 — no painting layer, full width at its own aspect ratio (1786x1452) */}
        <FullWidthMedia>
          <Image
            src="/images/Tandem - Case Study/Tandem 3.png"
            alt=""
            width={1786}
            height={1452}
            sizes="100vw"
            quality={90}
            style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
          />
        </FullWidthMedia>

        {/* Paragraph 3 (split A/B/C) + final paragraph/credit — two columns */}
        <GridSection>
          <BodyText
            start={4}
            paragraphs={[
              "The event was meant to bring together a whole host of Barcelona creatives to build a creative space where the chosen artist, Argentine dancer and choreographer Tomas Pintos, could create without the restrictions of what everyone else wanted.",
              "The result was something that went well beyond a performance piece. The space was transformed into a gallery exposition, with frosted windows and clothes as sculpture.",
              "During the performance, Pintos moved slowly through the crowd to stripped-back classical music. It was a space that recognized that art is always a community event. The audience and the performer were in direct conversation.",
            ]}
          />
          <div className="fcc-col-item" style={{ gridColumn: `7 / ${7 + COL_SPAN}` }}>
            <p style={columnBody}>
              Tandem now is looking outward, expanding our contributor network, searching for new artists, and continuing to hone the Tandem ethos.
            </p>
            <p style={creditText}>
              Art direction by Isabella Fox Arias. Branding by Mirando Fox Arias.
            </p>
          </div>
        </GridSection>

        {/* Video — no painting layer, full width, autoplay muted loop (same convention as the Tandem homepage card) */}
        <FullWidthMedia>
          <video
            src="/images/Tandem - Case Study/Tandem - 03.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
          />
        </FullWidthMedia>

        {/* Image 4 */}
        <FullBleedImage
          background={img('Painting - 4')}
          foreground={img('Image - 04')}
        />

      </div>

      <Footer />
    </main>
  )
}
