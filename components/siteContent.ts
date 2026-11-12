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
  // Structured intro for pages that lead with a headline (logistics page).
  hero?: { intro: string; headline: string; offer: string; body: string; experienceLabel: string; proof: string; invitation: string }
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

// Logistics landing page (/work/fcc). Copy supplied by Isabella, 12 Nov 2026.
// Reading order: who I am (intro, in the header) -> what I understand
// (headline) -> what I take responsibility for (offer) -> why (body) ->
// relevant experience (proof) -> next step (invitation + email).
const LOGISTICS_HERO = {
  intro: 'I’m Isabella Fox Arias, a UX/UI consultant for fleet and logistics software companies.',
  headline: 'Fleet software has to work at the desk and in the field.',
  offer: 'I work with founders and product leaders to solve complex product problems, from deciding what needs to change to designing and building the solution.',
  body: 'As products grow, decisions that made sense for one feature can create inconsistencies across the platform. Office staff develop workarounds, field users struggle with screens built for a desktop, and each new feature becomes harder to fit into the existing system.',
  experienceLabel: 'Relevant experience',
  proof: 'I restructured Fleet Cost & Care’s 20+ year-old platform, accounting for both experienced users and people learning it for the first time.',
  invitation: 'Have a product challenge?',
}

export const LOGISTICS_CONTENT: SiteContent = {
  tagline: LOGISTICS_HERO.intro,
  hero: LOGISTICS_HERO,
  about: [], // unused: the logistics page has its own header and hero
  location: ['Remote'],
  contactPrompt: [LOGISTICS_HERO.invitation],
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
