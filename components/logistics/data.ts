// Content for the logistics landing page (/work/fcc).
//
// PLACEHOLDER COPY: Isabella writes the page copy. Everything marked
// PLACEHOLDER below (problem lines, thinking beats) is a working label so the
// layout can be reviewed. Replace before publishing. While
// SHOW_PLACEHOLDER_MARKERS is true, rows show a visible "placeholder" tag.

export const SHOW_PLACEHOLDER_MARKERS = false

// Hidden for now. Set to true to show the "Independent concept" labels again
// (slideshow caption and the caption under each problem screen).
export const SHOW_CONCEPT_LABELS = false

// Slideshow caption. The six screens are independent concepts, not delivered
// FCC work. Isabella writes the concepts' own project title and one line on
// how they relate to her FCC experience; until then the caption falls back to
// the name on each slide.
export const CONCEPT_TITLE: string | null = null
export const CONCEPT_NOTE: string | null = null

const base = '/images/fcc-logistics'

export type SlideLabel = 'FCC work' | 'Independent concept'

export interface HeroSlide {
  id: string
  kind: 'image' | 'video'
  src: string
  poster?: string
  width: number
  height: number
  name: string
  // ASSUMPTION: all six slides are independent concepts built around the FCC
  // problem space. Isabella confirms or changes each one.
  label: SlideLabel
  alt: string
}

// Order alternates desk and field to match the headline. The three desktop
// slides are cropped from the full screens to the part that carries the point.
export const HERO_SLIDES: HeroSlide[] = [
  { id: 'h5', kind: 'image', src: `${base}/hero-5-schedule-crop-hr.webp`, width: 2304, height: 1080, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Weekly schedule with two flagged equipment and crew conflicts' },
  { id: 'h1', kind: 'video', src: `${base}/hero-1-recording.mp4`, poster: `${base}/hero-1-recording-poster.webp`, width: 2400, height: 2000, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A technician records a repair by voice and the work order fills in' },
  { id: 'h4', kind: 'image', src: `${base}/hero-4-morning-brief-crop-hr.webp`, width: 1557, height: 1224, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A morning brief with three priorities above a work queue' },
  { id: 'h2', kind: 'video', src: `${base}/hero-2-photo-scan.mp4`, poster: `${base}/hero-2-photo-scan-poster.webp`, width: 2400, height: 2000, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A photo of a part is scanned and read into the work order' },
  { id: 'h6', kind: 'image', src: `${base}/hero-6-edit-work-order-crop-hr.webp`, width: 1574, height: 896, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A work order edit panel open over the board' },
  { id: 'h3', kind: 'image', src: `${base}/hero-3-review-attachments-hr.webp`, width: 2400, height: 2071, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Chat on the left and the draft work order with a flagged detail on the right' },
]

export interface RowImage {
  src: string
  width: number
  height: number
  device: 'desktop' | 'mobile'
  // PLACEHOLDER caption: describes the screen. Isabella writes the real ones.
  caption: string
  label: SlideLabel
}

export interface ProblemRow {
  id: string
  number: string
  // PLACEHOLDER: working label from the project index (10 Nov). Isabella writes the real problem line.
  problem: string
  tag: string
  // PLACEHOLDER: what she noticed, what she decided, why.
  thinking: { heading: string; text: string }[]
  images: RowImage[]
  // Optional: one short clip per thinking beat (same order as `thinking`).
  // When present the row uses the pinned clip stage instead of the stills.
  clips?: RowClip[]
}

export interface RowClip {
  src: string
  poster: string
  width: number
  height: number
  // PLACEHOLDER: Isabella rewrites these captions.
  caption: string
}

const L: SlideLabel = 'Independent concept'

export const PROBLEM_ROWS: ProblemRow[] = [
  {
    id: 'field',
    number: '01',
    problem: 'Field users fall back to paper',
    tag: 'Field reporting',
    thinking: [
      { heading: 'Noticed', text: 'Typing into a form competes with the job at hand. A photo or spoken explanation can capture the details with less interruption.' },
      { heading: 'Decided', text: 'Let technicians build one work order from photos, voice notes, or text, using whichever suits the job.' },
      { heading: 'Why', text: 'When technicians can finish reporting on site, there’s less reason to keep paper notes for someone to enter later.' },
    ],
    images: [
      { src: `${base}/p1-01-mobile-choose-capture-method-hr.webp`, width: 997, height: 2700, device: 'mobile', caption: 'Start a report with photos, voice notes, or text.', label: L },
      { src: `${base}/p1-02-desktop-review-and-confirm-work-order-hr.webp`, width: 2400, height: 2233, device: 'desktop', caption: 'Review captured details and confirm anything flagged before submitting.', label: L },
      { src: `${base}/p1-03-mobile-queue-report-offline-with-notice-hr.webp`, width: 997, height: 2700, device: 'mobile', caption: 'Save reports offline and sync when a connection returns.', label: L },
      { src: `${base}/p1-04-desktop-review-submitted-work-orders-hr.webp`, width: 2400, height: 2070, device: 'desktop', caption: 'Filter submitted reports by technician, equipment, and review status.', label: L },
      { src: `${base}/p1-05-mobile-review-photo-based-work-order-optional-hr.webp`, width: 997, height: 2813, device: 'mobile', caption: 'Check work order details and photos from the field.', label: L },
    ],
  },
  {
    id: 'overview',
    number: '02',
    problem: 'Nobody sees today’s state at a glance',
    tag: 'Operations overview',
    thinking: [
      { heading: 'Noticed', text: 'A unit count doesn’t explain what’s holding equipment back, which decisions are outstanding, or what the next shift needs to know.' },
      { heading: 'Decided', text: 'Build an operations view that connects daily priorities with weekly progress and end-of-day handoffs.' },
      { heading: 'Why', text: 'Managers can act on immediate blockers and carry unfinished work into the next shift without rebuilding the picture each time.' },
    ],
    images: [
      { src: `${base}/p2-01-view-daily-work-queue-hr.webp`, width: 2400, height: 2070, device: 'desktop', caption: 'See fleet availability, scheduled jobs, and decisions needing attention.', label: L },
      { src: `${base}/p2-02-generate-weekly-overview-hr.webp`, width: 2400, height: 2476, device: 'desktop', caption: 'Generate a weekly summary of progress and outstanding blockers.', label: L },
      { src: `${base}/p2-03-read-end-of-day-wrap-hr.webp`, width: 2400, height: 2750, device: 'desktop', caption: 'Review completed work, unresolved blockers, and tomorrow’s handoff needs.', label: L },
    ],
  },
  {
    id: 'dispatch',
    number: '03',
    problem: 'Crews, equipment, and jobs collide on the schedule',
    tag: 'Weekly dispatch',
    thinking: [
      { heading: 'Noticed', text: 'Moving a job also affects its operator, equipment, and maintenance commitments. Those dependencies are easy to miss when bookings are managed separately.' },
      { heading: 'Decided', text: 'Treat crew, equipment, and job bookings as one connected schedule, so changes carry across every view.' },
      { heading: 'Why', text: 'Dispatchers can resolve clashes with the full picture in front of them, rather than fixing one booking and creating another conflict.' },
    ],
    images: [],
    clips: [
      { src: `${base}/p3-clip-move.mp4`, poster: `${base}/p3-clip-move-poster.webp`, width: 1440, height: 810, caption: 'Move a job and update crew and equipment bookings.' },
      { src: `${base}/p3-clip-views.mp4`, poster: `${base}/p3-clip-views-poster.webp`, width: 1440, height: 810, caption: 'See the same change in the employee, equipment, and job views.' },
      { src: `${base}/p3-clip-resolve.mp4`, poster: `${base}/p3-clip-resolve-poster.webp`, width: 1440, height: 810, caption: 'Resolve an equipment conflict by assigning another available crane.' },
    ],
  },
  {
    id: 'tracking',
    number: '04',
    problem: 'Desk users work around a dense legacy tool',
    tag: 'Work order tracking',
    thinking: [
      { heading: 'Noticed', text: 'Experienced users need to compare detailed records and move work forward. A single fixed layout makes one of those tasks harder.' },
      { heading: 'Decided', text: 'Give users board and table views of the same work orders, with routine actions available in context.' },
      { heading: 'Why', text: 'Coordinators can switch between tracking progress and checking details without maintaining a separate spreadsheet or sacrificing the information they rely on.' },
    ],
    images: [
      { src: `${base}/p4-01-view-work-order-board-hr.webp`, width: 2400, height: 1646, device: 'desktop', caption: 'Scan work orders by stage, technician, and outstanding details.', label: L },
      { src: `${base}/p4-02-move-work-order-to-in-progress-hr.webp`, width: 2400, height: 1646, device: 'desktop', caption: 'Move a work order directly into its next stage.', label: L },
      { src: `${base}/p4-03-open-new-work-order-form-hr.webp`, width: 2400, height: 1647, device: 'desktop', caption: 'Add a work order without leaving the current view.', label: L },
      { src: `${base}/p4-04-view-work-order-table-hr.webp`, width: 2400, height: 1646, device: 'desktop', caption: 'Compare equipment, assignments, status, and timing in one table.', label: L },
    ],
  },
]
