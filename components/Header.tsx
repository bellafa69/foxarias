import { CSSProperties } from 'react'
import TypedHeadline from './TypedHeadline'

const mono: CSSProperties = {
  fontSize: '12px',
  lineHeight: '20px',
  fontWeight: 500,
}

const col: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

function BlockLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ ...mono, textDecoration: 'underline' }}
    >
      {children}
    </a>
  )
}

export default function Header() {
  return (
    <section
      className="grid-12"
      style={{
        paddingTop: '92px',
        paddingBottom: '120px',
        alignItems: 'start',
      }}
    >
      {/* Cols 1–3: Tagline + about */}
      <div style={{ gridColumn: '1 / span 3' }}>
        <TypedHeadline />
      </div>

      {/* Cols 5–6: Contact */}
      <div style={{ gridColumn: '5 / span 2', ...col, gap: '20px' }}>
        <div style={{ ...col }}>
          <span style={mono}>Between Barcelona, ES</span>
          <span style={mono}>and Brooklyn, New York.</span>
        </div>

        <div style={{ ...col }}>
          <span style={mono}>For Projects, Jobs,</span>
          <span style={mono}>or to talk about books:</span>
        </div>

        <div style={{ ...col }}>
          <BlockLink href="mailto:bellaarias@gmail.com">bellaarias@gmail.com</BlockLink>
        </div>

        <div style={{ ...col }}>
          <BlockLink href="https://linkedin.com/in/foxarias">Linkedin</BlockLink>
          <BlockLink href="https://instagram.com/foxarias">Instagram</BlockLink>
        </div>
      </div>

      {/* Cols 7–8: What I can do */}
      <div style={{ gridColumn: '7 / span 2', ...col }}>
        {[
          'Product Design',
          'UX/UI Design',
          'Design Systems',
          'Product Strategy',
          'Brand Strategy',
          'Art Direction',
          'User Research',
          'Web Design',
          'Copywriting',
          'Prototyping',
          'Editorial Design',
          'Content Strategy',
        ].map((skill) => (
          <span key={skill} style={mono}>{skill}</span>
        ))}
      </div>

      {/* Cols 9–10: What I'm up to */}
      <div style={{ gridColumn: '9 / span 2', ...col, gap: '20px' }}>
        <div style={{ ...col, gap: '2px' }}>
          <span style={mono}>What I&apos;m reading:</span>
          <BlockLink href="#">Babbel by R.F Kuang</BlockLink>
        </div>

        <div style={{ ...col, gap: '2px' }}>
          <span style={mono}>What I&apos;m painting:</span>
          <BlockLink href="#">The Heroines Journey</BlockLink>
        </div>

        <div style={{ ...col, gap: '2px' }}>
          <span style={mono}>What I&apos;m writing:</span>
          <BlockLink href="#">Painter Jess Allen&apos;s Shadows</BlockLink>
        </div>
      </div>
    </section>
  )
}
