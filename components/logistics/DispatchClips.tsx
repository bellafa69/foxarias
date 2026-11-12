'use client'

import { useEffect, useRef, useState } from 'react'
import type { ProblemRow } from './data'

const small: React.CSSProperties = { fontSize: '12px', lineHeight: '16px', fontWeight: 500 }
const HOLD_MS = 1500 // let the result sit on screen before the clip restarts

// One clip. Plays from the start whenever `playing` turns true, holds on the
// finished frame for a beat, then restarts. Paused and rewound when not playing.
// Reduced motion: the poster (the finished state) stays still.
function Clip({ clip, playing, reduced, eager }: { clip: NonNullable<ProblemRow['clips']>[number]; playing: boolean; reduced: boolean; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    clearTimeout(timer.current)
    if (playing && !reduced) {
      v.currentTime = 0
      void v.play().catch(() => {})
    } else {
      v.pause()
    }
    return () => clearTimeout(timer.current)
  }, [playing, reduced])

  return (
    <video
      ref={ref}
      src={clip.src}
      poster={clip.poster}
      muted
      playsInline
      preload={playing || eager ? 'auto' : 'none'}
      aria-label={clip.caption}
      onEnded={() => {
        if (!playing || reduced) return
        timer.current = setTimeout(() => {
          const v = ref.current
          if (!v) return
          v.currentTime = 0
          void v.play().catch(() => {})
        }, HOLD_MS)
      }}
      style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
    />
  )
}

// Desktop: the stage stays pinned while the three beats scroll past, and the
// clip follows the beat being read. Phones: each beat is followed by its own
// clip, which plays when it comes into view. Plain sticky positioning, no
// scroll takeover.
export default function DispatchClips({ row, onStep }: { row: ProblemRow; onStep: (i: number) => void }) {
  const clips = row.clips!
  const beatRefs = useRef<(HTMLElement | null)[]>([])
  const inlineRefs = useRef<(HTMLElement | null)[]>([])
  const [desktop, setDesktop] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState<boolean[]>(() => clips.map(() => false))

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => { setDesktop(mq.matches); setReduced(rm.matches) }
    sync()
    mq.addEventListener('change', sync)
    rm.addEventListener('change', sync)
    return () => { mq.removeEventListener('change', sync); rm.removeEventListener('change', sync) }
  }, [])

  // Desktop: the beat nearest the middle of the viewport is the active one.
  useEffect(() => {
    if (!desktop) return
    let raf = 0
    const check = () => {
      const mid = window.innerHeight * 0.5
      let best = 0, bestD = Infinity
      beatRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = r.top <= mid && r.bottom >= mid ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid))
        if (d < bestD) { bestD = d; best = i }
      })
      setActive(best)
      onStep(best)
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(check) }
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    check()
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [desktop, onStep])

  // Phones: play a clip while it is mostly on screen.
  useEffect(() => {
    if (desktop) return
    const io = new IntersectionObserver(entries => {
      setVisible(v => {
        const next = [...v]
        entries.forEach(e => {
          const i = inlineRefs.current.indexOf(e.target as HTMLElement)
          if (i >= 0) next[i] = e.intersectionRatio >= 0.6
        })
        return next
      })
    }, { threshold: [0, 0.6, 1] })
    inlineRefs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [desktop])

  useEffect(() => {
    if (!desktop) { const i = visible.lastIndexOf(true); if (i >= 0) onStep(i) }
  }, [visible, desktop, onStep])

  return (
    <>
      <div className="lg-beats">
        {row.thinking.map((b, i) => (
          <div key={b.heading} className="lg-beat" ref={el => { beatRefs.current[i] = el }} style={{ opacity: desktop && active !== i ? 0.45 : 1, transition: 'opacity 0.3s ease' }}>
            <div style={{ ...small, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--site-fg-muted)', marginBottom: '8px' }}>{b.heading}</div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '22px', fontWeight: 400 }}>{b.text}</p>
            {!desktop && clips[i] && (
              <figure className="lg-beat-inline" ref={el => { inlineRefs.current[i] = el }} style={{ margin: '24px 0 0' }}>
                <div className="lg-screen lg-clip-frame" style={{ aspectRatio: `${clips[i].width} / ${clips[i].height}` }}>
                  <Clip clip={clips[i]} playing={i === visible.indexOf(true)} reduced={reduced} />
                </div>
                <figcaption className="lg-caption">
                  <span style={{ ...small, color: 'var(--site-fg-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ ...small, flex: 1, color: 'rgba(255, 255, 255, 0.65)' }}>{clips[i].caption}</span>
                </figcaption>
              </figure>
            )}
          </div>
        ))}
      </div>

      {desktop && (
        <div className="lg-clipstage">
          <div className="lg-clipstage-inner">
            <div className="lg-screen lg-clip-frame" style={{ aspectRatio: `${clips[0].width} / ${clips[0].height}` }}>
              {clips.map((c, i) => (
                <div key={c.src} style={{ gridArea: '1 / 1', display: active === i ? 'block' : 'none', width: '100%', height: '100%' }}>
                  <Clip clip={c} playing={active === i} reduced={reduced} eager={i === 0} />
                </div>
              ))}
            </div>
            <div className="lg-caption">
              <span style={{ ...small, color: 'var(--site-fg-muted)' }}>{String(active + 1).padStart(2, '0')}</span>
              <span style={{ ...small, flex: 1, color: 'rgba(255, 255, 255, 0.65)' }}>{clips[active].caption}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
