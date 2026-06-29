'use client'

import { AnimatePresence, motion } from 'framer-motion'

export type MenuSection = 'information' | 'what-i-can-do' | 'what-im-up-to'

interface Props {
  activeMenu: MenuSection | null
  onMenuClick: (item: MenuSection | null) => void
}

const MENU_ITEMS: { key: MenuSection; label: string }[] = [
  { key: 'information',    label: 'Information'    },
  { key: 'what-i-can-do', label: 'What I Can Do'  },
  { key: 'what-im-up-to', label: "What I'm Up To" },
]

const SKILLS = [
  'Product Design', 'UX/UI Design', 'Design Systems', 'Product Strategy',
  'Brand Strategy', 'Art Direction', 'User Research', 'Web Design',
  'Copywriting', 'Prototyping', 'Editorial Design', 'Content Strategy',
]

const contentText: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 500,
  color: '#ffffff',
  margin: 0,
}

const navText: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 500,
  color: '#ffffff',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}

function PanelContent({ activeMenu }: { activeMenu: MenuSection }) {
  if (activeMenu === 'information') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={contentText}>(INFORMATION)</p>
        <div style={{ height: '24px' }} />
        <p style={contentText}>Between Barcelona, ES and Brooklyn, New York.</p>
        <p style={contentText}>
          {'For Projects, Jobs, or to talk about books: hello@foxarias.com'}
        </p>
        <p style={{ ...contentText, marginTop: '4px' }}>
          <a href="#" style={{ color: '#ffffff' }}>LinkedIn</a>
          {'  '}
          <a href="#" style={{ color: '#ffffff' }}>Instagram</a>
        </p>
      </div>
    )
  }

  if (activeMenu === 'what-i-can-do') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={contentText}>(WHAT I CAN DO)</p>
        <div style={{ height: '24px' }} />
        {SKILLS.map((skill, i) => (
          <p key={skill} style={contentText}>
            {skill}{i < SKILLS.length - 1 ? ',' : ''}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <p style={contentText}>{"(WHAT I'M UP TO)"}</p>
      <div style={{ height: '24px' }} />
      <p style={contentText}>{"What I'm reading: Babel by R.F. Kuang"}</p>
      <p style={contentText}>{"What I'm painting: German Expressionist figures"}</p>
      <p style={contentText}>{"What I'm writing: Painter Jess Allen's Shadows"}</p>
      <p style={contentText}>My Next Project:</p>
    </div>
  )
}

export default function MenuOverlay({ activeMenu, onMenuClick }: Props) {
  return (
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          key="menu-overlay"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000000',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {/* Nav inside overlay */}
          <header
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              paddingInline: '32px',
            }}
          >
            <button onClick={() => onMenuClick(null)} style={{ ...navText, fontWeight: 700, letterSpacing: '-0.02em' }}>
              FOX ARIAS
            </button>

            <button onClick={() => onMenuClick(null)} style={{ ...navText, marginLeft: '16px' }}>
              Isabella Fox Arias is a designer and art director.
            </button>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              {MENU_ITEMS.map((item, i) => (
                <span key={item.key} style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => onMenuClick(activeMenu === item.key ? null : item.key)}
                    style={{
                      ...navText,
                      textDecoration: activeMenu === item.key ? 'underline' : 'none',
                    }}
                  >
                    {item.label}
                  </button>
                  {i < MENU_ITEMS.length - 1 && (
                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#ffffff' }}>,&nbsp;</span>
                  )}
                </span>
              ))}
            </div>

            <button onClick={() => onMenuClick(null)} style={{ ...navText, marginLeft: '24px' }}>
              hello@foxarias.com
            </button>
          </header>

          {/* Panel content */}
          <div style={{ paddingTop: '120px', paddingLeft: '32px' }}>
            <PanelContent activeMenu={activeMenu} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
