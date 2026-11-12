'use client'

import { useEffect, useRef, useState } from 'react'

// A short scene that plays once when it is mostly on screen and holds on its
// result. Scrolling away rewinds it so it plays again on return. Reduced
// motion: the poster (the finished state) stays still.
export default function ClipVideo({ src, poster, label, eager }: { src: string; poster: string; label: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.55) {
        v.currentTime = 0
        void v.play().catch(() => {})
      } else {
        v.pause()
        v.currentTime = 0
      }
    }, { threshold: [0, 0.55, 1] })
    io.observe(v)
    return () => io.disconnect()
  }, [reduced])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload={eager ? 'auto' : 'metadata'}
      aria-label={label}
      style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }}
    />
  )
}
