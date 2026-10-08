const WHAT_I_CAN_DO = [
  'Art Direction', 'Producer / Project Management', 'Brand Strategy + Design', 'Web Design',
  'Information Architecture', 'UX/UI Design', 'Content Strategy', 'Editorial Design',
]

const WHAT_IM_UP_TO = [
  { label: "What I'm reading",  value: 'Babel by R.F. Kuang'          },
  { label: "What I'm painting", value: 'The Heroines Journey'          },
  { label: "What I'm writing",  value: "Painter Jess Allen's Shadows"  },
]

const ABOUT_TEXT = [
  "I work at the intersection of strategy, design, technology, and culture, all under the umbrella of problem-solving. While problems may look wildly different, the process is surprisingly consistent: asking a question, conducting cross-disciplinary research, building an argument, and giving the solution form.",
  "App design, branding, editorial design, and website development are all different expressions of this same process.",
]

const colText: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  color: '#ffffff',
}

export default function InfoSection() {
  return (
    <div
      className="info-desktop-only"
      style={{
        backgroundColor: '#000000',
        paddingInline: '32px',
        paddingTop: '16px',
        paddingBottom: '40px',
      }}
    >
      {/* About — cols 1–6, under the logo */}
      <div style={{ gridColumn: '1 / 7' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '380px' }}>
          {ABOUT_TEXT.map((para, i) => (
            <div key={i} style={colText}>{para}</div>
          ))}
        </div>
      </div>

      {/* Contact — cols 7–8 */}
      <div style={{ gridColumn: '7 / 9' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <div style={colText}>Between Barcelona, ES</div>
            <div style={colText}>and Brooklyn, New York.</div>
          </div>
          <div>
            <div style={colText}>For Projects, Jobs,</div>
            <div style={colText}>or to talk about books:</div>
          </div>
          <div>
            <a
              href="mailto:bellaarias@gmail.com"
              style={{ ...colText, color: '#ffffff', display: 'block', paddingTop: '8px', paddingBottom: '8px' }}
            >
              bellaarias@gmail.com
            </a>
            <a href="#" style={{ ...colText, color: '#ffffff', display: 'block' }}>
              LinkedIn
            </a>
            <a href="#" style={{ ...colText, color: '#ffffff', display: 'block' }}>
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* What I Can Do — cols 9–10 */}
      <div style={{ gridColumn: '9 / 11' }}>
        {WHAT_I_CAN_DO.map(skill => (
          <div key={skill} style={colText}>{skill}</div>
        ))}
      </div>

      {/* What I'm Up To — cols 11–12 */}
      <div style={{ gridColumn: '11 / 13' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {WHAT_IM_UP_TO.map(item => (
            <div key={item.label}>
              <div style={{ ...colText, opacity: 0.5 }}>{item.label}</div>
              <div style={colText}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
