'use client'

import CaseStudyLarge, { CaseStudyLargeProps } from './CaseStudyLarge'
import SoloAiScrollAnimation from './SoloAiScrollAnimation'

const h = (n: string) => `/images/home_images/home-${n}.webp`
const fcc = (n: string) => `/images/fcc/fcc-${n}.png`
const cadence = (n: string) => `/images/cadence/Cadence - ${n}.png`
const img = (n: string) => `/images/${n}`

const SECTIONS: Omit<CaseStudyLargeProps, 'number'>[] = [
  {
    title: 'Fleet, Cost & Care',
    role: 'Lead Product Designer',
    year: '2026',
    type: 'Client Work',
    tags: 'Product Design, UX, Design Systems',
    heroImages: true,
    infoText: "A full-scale redesign for a Fleet management platform.",
    images: [
      { src: fcc('03'), ratio: 3001 / 2228, height: 74, background: fcc('background') },
      { src: fcc('02'), ratio: 1962 / 2064, height: 80, background: fcc('background') },
      { src: fcc('01'), ratio: 3001 / 2249, height: 74, background: fcc('background') },
    ],
  },
  {
    title: 'Event Cadence',
    role: 'Senior Product Designer',
    year: '2019-2026',
    type: 'In-house',
    tags: 'Product Design, Design Systems, Branding',
    heroImages: true,
    infoText: 'Managed end-to-end design process for Cadence, an Event management app that required constant feature development, brand iteration, and UX/UI maintenance.',
    images: [
      { src: cadence('01'), ratio: 2213 / 1658, height: 74, background: cadence('Painting') },
      { src: cadence('02'), ratio: 1962 / 2064, height: 80, background: cadence('Painting') },
      { src: cadence('03'), ratio: 2213 / 1658, height: 74, background: cadence('Painting') },
    ],
  },
  {
    title: 'Sentri',
    role: 'Lead Product Designer',
    year: '2025',
    type: 'Client Work',
    tags: 'Product Design, UX',
    status: 'Not Shipped',
    heroImages: true,
    comingSoon: true,
    infoText: "An app developed for a cutting-edge veterinary tech product.",
    images: [
      { src: '/images/Sentri/Sentri - 01.png', ratio: 2814 / 2064, height: 74, background: '/images/Sentri/Sentri - Painting.png', paddedForeground: true },
    ],
  },
  {
    title: 'Tandem Magazine',
    role: 'Editor + Co-Founder',
    year: '2025-Present',
    type: 'Press',
    tags: 'Editorial, Art Direction, Arts Writing, Cultural Criticism',
    heroImages: true,
    infoText: 'Co-editor and co-founder of Tandem Magazine, an art magazine focusing on a transhistoric perspective for contemporary art.',
    images: [
      { src: '', ratio: 16 / 9, height: 74, background: img('Tandem - Case study.png'), videoSrc: '/images/Tandem Video.mp4', noHoverScale: true },
    ],
  },
  {
    title: 'Solo.ai',
    role: 'Product Designer',
    year: '2026',
    type: 'Client Work',
    tags: 'Web Design, Strategy',
    status: 'Not Shipped',
    heroImages: true,
    comingSoon: true,
    infoText: 'Website development for solo.ai, with a focus on their security page.',
    images: [
      { src: '', ratio: 16 / 9, height: 78, background: img('solo.ai - painting.png'), foregroundNode: <SoloAiScrollAnimation />, noHoverScale: true },
    ],
  },
  {
    title: 'Dazed, Interview, Metal etc.',
    role: 'Writer',
    year: '2024-Present',
    type: 'Press',
    tags: 'Arts Writing, Cultural Criticism',
    writingItems: [
      { title: 'How Painter Anthony Cudahy Finds Intimacy in the Mundane', publication: 'Interview Magazine', url: 'https://www.interviewmagazine.com/art/how-painter-anthony-cudahy-finds-intimacy-in-the-mundane' },
      { title: 'For Eimear Walshe, There Are No ‘Goodies or Baddies’', publication: 'OFFICE Magazine', url: 'https://officemagazine.net/eimear-walshe-there-are-no-goodies-or-baddies' },
      { title: 'In Photos: Barcelona’s ‘Daring and Ecstatic’ Queer Latinx Club Night', publication: 'Dazed', url: 'https://www.dazeddigital.com/art-photography/article/62111/1/in-photos-the-queer-latinx-joy-of-barcelonas-latineo' },
      { title: 'Studio Lenca', publication: 'Metal Magazine', url: 'https://www.metalmagazine.eu/en/post/studio-lenca-interview' },
      { title: 'Daisy Parris - Modern They', publication: 'Metal Magazine', url: 'https://www.metalmagazine.eu/en/post/daisy-parris', plusMore: true },
    ],
  },
]

export default function CaseStudyLargeSections() {
  return (
    <div
      className="cs-sections-wrapper"
      style={{ backgroundColor: 'var(--site-bg)', color: 'var(--site-fg)' }}
    >
      {SECTIONS.map((section, i) => (
        <CaseStudyLarge key={section.title} {...section} number={i + 1} />
      ))}
    </div>
  )
}
