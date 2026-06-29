'use client'

export default function LogoHover() {
  return (
    <div
      onMouseEnter={() => document.documentElement.classList.add('dark')}
      onMouseLeave={() => document.documentElement.classList.remove('dark')}
      style={{ gridColumn: '1 / span 2', fontSize: '22px', lineHeight: '28px', fontWeight: 700, cursor: 'default' }}
    >
      FOX ARIAS
    </div>
  )
}
