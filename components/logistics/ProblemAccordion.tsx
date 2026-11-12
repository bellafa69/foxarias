'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import DispatchClips from './DispatchClips'
import { PROBLEM_ROWS, SHOW_PLACEHOLDER_MARKERS, type ProblemRow, SHOW_CONCEPT_LABELS } from './data'

const small: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
}

// One problem. The header sticks under the nav while the row's content scrolls
// past, so the problem stays in view. A row counts as "open" while it crosses
// the middle of the viewport: its content is full strength and the step
// counter follows the image being read. Other rows are dimmed.
function Row({ row }: { row: ProblemRow }) {
  const sectionRef = useRef<HTMLElement>(null)
  const figRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const clipRow = !!row.clips

  useEffect(() => {
    let raf = 0
    const check = () => {
      const el = sectionRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setActive(r.top <= vh * 0.5 && r.bottom >= vh * 0.35)
      let current = 0
      figRefs.current.forEach((f, i) => {
        if (f && f.getBoundingClientRect().top <= vh * 0.55) current = i
      })
      if (!clipRow) setStep(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    check()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [clipRow])

  const dim = active ? 1 : 0.4

  return (
    <section ref={sectionRef} className="lg-row" aria-labelledby={`lg-${row.id}`}>
      <div className="lg-row-header">
        <div className="lg-row-header-grid">
          <span className="lg-col-num" style={{ ...small, color: 'var(--site-fg-muted)' }}>{row.number}</span>
          <h2
            id={`lg-${row.id}`}
            className="lg-col-problem"
            style={{ color: active ? 'var(--site-fg)' : 'var(--site-fg-muted)' }}
          >
            {row.problem}
          </h2>
          <span className="lg-col-tag" style={{ ...small, textTransform: 'uppercase', color: 'var(--site-fg-muted)' }}>{row.tag}</span>
          <span className="lg-col-step" style={{ ...small, color: active ? 'var(--site-fg)' : 'var(--site-fg-muted)' }}>
            {step + 1} / {clipRow ? row.clips!.length : row.images.length}
          </span>
        </div>
      </div>

      <div className={`lg-row-body${clipRow ? ' lg-row-clips' : ''}`} style={{ opacity: dim, transition: 'opacity 0.4s ease' }}>
        {clipRow ? <DispatchClips row={row} onStep={setStep} /> : (<>
        <div className="lg-thinking">
          <div className="lg-thinking-inner">
            {SHOW_PLACEHOLDER_MARKERS && (
              <div style={{ ...small, textTransform: 'uppercase', color: '#d9a441', marginBottom: '16px' }}>
                Placeholder copy
              </div>
            )}
            {row.thinking.map(b => (
              <div key={b.heading} style={{ marginBottom: '24px' }}>
                <div style={{ ...small, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--site-fg-muted)', marginBottom: '8px' }}>{b.heading}</div>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '22px', fontWeight: 400 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg-figures">
          {row.images.map((img, i) => (
            <figure
              key={img.src}
              ref={el => { figRefs.current[i] = el }}
              className={`lg-figure lg-figure-${img.device}`}
              style={{ margin: 0 }}
            >
              <div
                className={`lg-screen lg-screen-${img.device}`}
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={img.width}
                  height={img.height}
                  unoptimized
                  loading="lazy"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              </div>
              <figcaption className="lg-caption">
                <span style={{ ...small, color: 'var(--site-fg-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ ...small, flex: 1, color: 'rgba(255, 255, 255, 0.65)' }}>{img.caption}</span>
                {SHOW_CONCEPT_LABELS && <span style={{ ...small, color: 'var(--site-fg-muted)', textTransform: 'uppercase' }}>{img.label}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
        </>)}
      </div>
    </section>
  )
}

export default function ProblemAccordion() {
  return (
    <div className="lg-accordion">
      {PROBLEM_ROWS.map(row => <Row key={row.id} row={row} />)}
    </div>
  )
}
