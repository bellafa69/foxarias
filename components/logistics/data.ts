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
// slides show the full screens, large.
export const HERO_SLIDES: HeroSlide[] = [
  { id: 'h5', kind: 'image', src: `${base}/hero-5-scheduling-conflicts-hr.webp`, width: 2400, height: 1733, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Weekly schedule with two flagged equipment and crew conflicts' },
  { id: 'h4', kind: 'image', src: `${base}/hero-4-morning-brief-wide-hr.webp`, width: 2400, height: 1733, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A morning brief with three priorities above a work queue' },
  { id: 'h2', kind: 'video', src: `${base}/hero-2-photo-scan.mp4`, poster: `${base}/hero-2-photo-scan-poster.webp`, width: 2400, height: 2000, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A photo of a part is scanned and read into the work order' },
  { id: 'h3', kind: 'image', src: `${base}/hero-3-review-attachments-hr.webp`, width: 2400, height: 2071, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Chat on the left and the draft work order with a flagged detail on the right' },
  { id: 'h6', kind: 'image', src: `${base}/hero-6-edit-work-order-hr.webp`, width: 2400, height: 1647, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A work order edit panel open over the board' },
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
    images: [],
    clips: [
      { src: `${base}/p1-1-record.mp4`, poster: `${base}/p1-1-record-poster.webp`, width: 2000, height: 1250, caption: 'A technician records a voice note on site.' },
      { src: `${base}/p1-2-done.mp4`, poster: `${base}/p1-2-done-poster.webp`, width: 2000, height: 1250, caption: 'One tap finishes it.' },
      { src: `${base}/p1-3-upload.mp4`, poster: `${base}/p1-3-upload-poster.webp`, width: 2000, height: 1250, caption: 'One tap uploads it.' },
      { src: `${base}/p1-4-listing.mp4`, poster: `${base}/p1-4-listing-poster.webp`, width: 2000, height: 1250, caption: 'It appears in the office listing.' },
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
    images: [],
    clips: [
      { src: `${base}/p2-1-state.mp4`, poster: `${base}/p2-1-state-poster.webp`, width: 2000, height: 1250, caption: 'Fleet status and the morning brief at a glance.' },
      { src: `${base}/p2-2-resolve.mp4`, poster: `${base}/p2-2-resolve-poster.webp`, width: 2000, height: 1250, caption: 'Resolve a blocker and the counts update.' },
      { src: `${base}/p2-3-generate.mp4`, poster: `${base}/p2-3-generate-poster.webp`, width: 2000, height: 1250, caption: 'Generate a leadership overview.' },
      { src: `${base}/p2-4-handoff.mp4`, poster: `${base}/p2-4-handoff-poster.webp`, width: 2000, height: 1250, caption: 'End-of-day handoff for tomorrow.' },
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
      { src: `${base}/p3-1-collision.mp4`, poster: `${base}/p3-1-collision-poster.webp`, width: 2000, height: 1250, caption: 'Two bookings collide on the calendar.' },
      { src: `${base}/p3-2-assign.mp4`, poster: `${base}/p3-2-assign-poster.webp`, width: 2000, height: 1250, caption: 'Assign another crane and the conflict clears.' },
      { src: `${base}/p3-3-move.mp4`, poster: `${base}/p3-3-move-poster.webp`, width: 2000, height: 1250, caption: 'Move a job to another day.' },
      { src: `${base}/p3-4-views.mp4`, poster: `${base}/p3-4-views-poster.webp`, width: 2000, height: 1250, caption: 'The change shows in every view.' },
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
    images: [],
    clips: [
      { src: `${base}/p4-1-board.mp4`, poster: `${base}/p4-1-board-poster.webp`, width: 2000, height: 1250, caption: 'Work orders by stage on a board.' },
      { src: `${base}/p4-2-move.mp4`, poster: `${base}/p4-2-move-poster.webp`, width: 2000, height: 1250, caption: 'Drag a work order to its next stage.' },
      { src: `${base}/p4-3-edit.mp4`, poster: `${base}/p4-3-edit-poster.webp`, width: 2000, height: 1250, caption: 'Reassign the technician without leaving the board.' },
      { src: `${base}/p4-4-table.mp4`, poster: `${base}/p4-4-table-poster.webp`, width: 2000, height: 1250, caption: 'The same work orders as a table.' },
    ],
  },
]
