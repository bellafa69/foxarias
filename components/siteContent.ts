// Copy for the hero info block (Nav tagline, hover dropdowns, mobile stack and
// InfoSection). The homepage uses HOME_CONTENT; other pages pass their own.

export interface UpToItem { label: string; value: string }

export interface SiteContent {
  tagline: string
  about: string[]
  location: string[]
  contactPrompt: string[]
  email: string
  linkedinHref: string
  instagramHref?: string
  skills: string[]
  mobileSkills: string[]
  // Omit to drop the "What I'm up to" column entirely.
  upTo?: UpToItem[]
}

const LINKEDIN = 'https://www.linkedin.com/in/isabella-fox-arias-20b1a0145/'

export const HOME_CONTENT: SiteContent = {
  tagline: 'Isabella Fox Arias is a designer.',
  about: [
    "I work at the intersection of strategy, design, technology, and culture, all under the umbrella of problem-solving. While problems may look wildly different, the process is surprisingly consistent: asking a question, conducting cross-disciplinary research, building an argument, and giving the solution form.",
    "App design, branding, editorial design, and website development are all different expressions of this same process.",
  ],
  location: ['Remote'],
  contactPrompt: ['For Projects, Jobs,', 'or to talk about books:'],
  email: 'isabella@foxarias.com',
  linkedinHref: LINKEDIN,
  instagramHref: 'https://www.instagram.com/bellafoxarias/',
  skills: [
    'Art Direction', 'Producer / Project Management', 'Brand Strategy + Design', 'Web Design',
    'Information Architecture', 'UX/UI Design', 'Content Strategy', 'Editorial Design',
  ],
  mobileSkills: [
    'Art Direction', 'Producer / Project Management', 'Brand Strategy + Design',
    'Web Design', 'Information Architecture', 'UX/UI Design',
  ],
  upTo: [
    { label: "What I'm reading",  value: 'Babel by R.F. Kuang'         },
    { label: "What I'm painting", value: 'The Heroines Journey'         },
    { label: "What I'm writing",  value: "Painter Jess Allen's Shadows" },
  ],
}

// Logistics landing page (/work/fcc). Copy supplied by Isabella, 11 Nov 2026.
export const LOGISTICS_CONTENT: SiteContent = {
  tagline: 'Isabella Fox Arias is a UX/UI consultant for fleet and logistics software.',
  about: [
    'Fleet software has to work at the desk and in the field. As products grow, decisions that made sense for one feature can create inconsistencies across the platform. Office staff develop workarounds, field users struggle with screens built for a desktop, and each new feature becomes harder to fit into the existing system.',
    'I work with founders and product leaders to untangle those problems and turn them into clear priorities, usable designs, and working prototypes. My experience includes restructuring Fleet Cost & Care’s 20+ year-old platform, accounting for both longtime users and people learning it for the first time.',
  ],
  location: ['Remote'],
  contactPrompt: ['Have a product challenge?'],
  email: 'isabella@foxarias.com',
  linkedinHref: LINKEDIN,
  skills: [
    'Product audits', 'Product planning', 'Workflow design',
    'Interface design', 'Interactive prototypes', 'Front-end development',
  ],
  mobileSkills: [
    'Product audits', 'Product planning', 'Workflow design',
    'Interface design', 'Interactive prototypes', 'Front-end development',
  ],
}
