'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import InfoSection from '@/components/InfoSection'
import Slideshow from '@/components/Slideshow'
import CaseStudyLargeSections from '@/components/CaseStudyLargeSections'
import Footer from '@/components/Footer'

export default function Home() {
  const [infoInView, setInfoInView] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = infoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInfoInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setRevealed(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Nav infoInView={infoInView} revealed={revealed} />
      <motion.div
        ref={infoRef}
        initial={{ height: 0 }}
        animate={{ height: revealed ? 'auto' : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <InfoSection />
      </motion.div>
      <motion.div
        initial={{ marginTop: 0 }}
        animate={{ marginTop: revealed ? '80px' : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <Slideshow revealed={revealed} />
      </motion.div>
      <CaseStudyLargeSections />
      <Footer />
    </>
  )
}
