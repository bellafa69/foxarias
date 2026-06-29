const columnLabel: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  opacity: 0.5,
  marginBottom: '12px',
}

const columnValue: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 500,
}

const columnLink: React.CSSProperties = {
  ...columnValue,
  display: 'block',
  color: '#ffffff',
  textDecoration: 'none',
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Large empty block before the heading */}
      <div style={{ height: '500px' }} />

      {/* Big bold heading */}
      <div style={{ paddingInline: '32px', paddingBottom: '80px' }}>
        <p style={{
          fontSize: '48px',
          lineHeight: '56px',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Get in touch. /{' '}
          <a
            href="mailto:hello@foxarias.com"
            style={{ color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '4px' }}
          >
            Write me.
          </a>
        </p>
      </div>

      {/* Small label-value columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          paddingInline: '32px',
          paddingBottom: '120px',
          maxWidth: '720px',
        }}
      >
        <div>
          <div style={columnLabel}>Location;</div>
          <div style={columnValue}>Between Barcelona, ES</div>
          <div style={columnValue}>and Brooklyn, New York.</div>
        </div>

        <div>
          <div style={columnLabel}>Contact;</div>
          <a href="mailto:hello@foxarias.com" style={columnLink}>hello@foxarias.com</a>
        </div>

        <div>
          <div style={columnLabel}>Social;</div>
          <a href="#" style={columnLink}>LinkedIn</a>
          <a href="#" style={columnLink}>Instagram</a>
        </div>
      </div>
    </footer>
  )
}
