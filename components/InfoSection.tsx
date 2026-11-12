import { HOME_CONTENT, type SiteContent } from './siteContent'

const colText: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  color: '#ffffff',
}

export default function InfoSection({ content = HOME_CONTENT }: { content?: SiteContent }) {
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
          {content.about.map((para, i) => (
            <div key={i} style={colText}>{para}</div>
          ))}
        </div>
      </div>

      {/* Contact — cols 7–8 */}
      <div style={{ gridColumn: '7 / 9' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            {content.location.map(l => <div key={l} style={colText}>{l}</div>)}
          </div>
          <div>
            {content.contactPrompt.map(l => <div key={l} style={colText}>{l}</div>)}
          </div>
          <div>
            <a
              href={`mailto:${content.email}`}
              style={{ ...colText, color: '#ffffff', display: 'block', paddingTop: '8px', paddingBottom: '8px' }}
            >
              {content.email}
            </a>
            <a href={content.linkedinHref} target="_blank" rel="noopener noreferrer" style={{ ...colText, color: '#ffffff', display: 'block' }}>
              LinkedIn
            </a>
            {content.instagramHref && (
              <a href={content.instagramHref} target="_blank" rel="noopener noreferrer" style={{ ...colText, color: '#ffffff', display: 'block' }}>
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      {/* What I Can Do — cols 9–10 */}
      <div style={{ gridColumn: '9 / 11' }}>
        {content.skills.map(skill => (
          <div key={skill} style={colText}>{skill}</div>
        ))}
      </div>

      {content.upTo && (
        <div style={{ gridColumn: '11 / 13' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {content.upTo?.map(item => (
              <div key={item.label}>
                <div style={{ ...colText, opacity: 0.5 }}>{item.label}</div>
                <div style={colText}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
