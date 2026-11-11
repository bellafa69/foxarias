// Content for the logistics landing page (/work/fcc).
//
// PLACEHOLDER COPY: Isabella writes the page copy. Everything marked
// PLACEHOLDER below (problem lines, thinking beats) is a working label so the
// layout can be reviewed. Replace before publishing. While
// SHOW_PLACEHOLDER_MARKERS is true, rows show a visible "placeholder" tag.

export const SHOW_PLACEHOLDER_MARKERS = true

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

export const HERO_SLIDES: HeroSlide[] = [
  { id: 'h1', kind: 'video', src: `${base}/hero-1-recording.mp4`, poster: `${base}/hero-1-recording-poster.webp`, width: 2400, height: 2000, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A technician records a repair by voice and the work order fills in' },
  { id: 'h2', kind: 'video', src: `${base}/hero-2-photo-scan.mp4`, poster: `${base}/hero-2-photo-scan-poster.webp`, width: 2400, height: 2000, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'A photo of a part is scanned and read into the work order' },
  { id: 'h3', kind: 'image', src: `${base}/hero-3-review-attachments.webp`, width: 1280, height: 1104, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Chat on the left and the draft work order with a flagged detail on the right' },
  { id: 'h4', kind: 'image', src: `${base}/hero-4-morning-brief.webp`, width: 1280, height: 1467, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Operations dashboard with a morning brief and a prioritized work queue' },
  { id: 'h5', kind: 'image', src: `${base}/hero-5-scheduling-conflicts.webp`, width: 1267, height: 915, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Weekly schedule with two flagged conflicts' },
  { id: 'h6', kind: 'image', src: `${base}/hero-6-edit-work-order.webp`, width: 1280, height: 878, name: 'FLEET, COST & CARE', label: 'Independent concept', alt: 'Work order board with an edit panel open' },
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
}

const beats = (): ProblemRow['thinking'] => [
  { heading: 'Noticed', text: '[Your copy: what you noticed]' },
  { heading: 'Decided', text: '[Your copy: what you decided]' },
  { heading: 'Why', text: '[Your copy: why]' },
]

const L: SlideLabel = 'Independent concept'

export const PROBLEM_ROWS: ProblemRow[] = [
  {
    id: 'field',
    number: '01',
    problem: 'Field users fall back to paper',
    tag: 'Field reporting',
    thinking: beats(),
    images: [
      { src: `${base}/p1-01-mobile-choose-capture-method.webp`, width: 399, height: 1080, device: 'mobile', caption: 'Choose capture method', label: L },
      { src: `${base}/p1-02-desktop-review-and-confirm-work-order.webp`, width: 1280, height: 1191, device: 'desktop', caption: 'Review and confirm work order', label: L },
      { src: `${base}/p1-03-mobile-queue-report-offline-with-notice.webp`, width: 399, height: 1080, device: 'mobile', caption: 'Queue report offline with notice', label: L },
      { src: `${base}/p1-04-desktop-review-submitted-work-orders.webp`, width: 1280, height: 1104, device: 'desktop', caption: 'Review submitted work orders', label: L },
    ],
  },
  {
    id: 'overview',
    number: '02',
    problem: 'Nobody sees today’s state at a glance',
    tag: 'Operations overview',
    thinking: beats(),
    images: [
      { src: `${base}/p2-01-view-daily-work-queue.webp`, width: 1280, height: 1104, device: 'desktop', caption: 'View daily work queue', label: L },
      { src: `${base}/p2-02-generate-weekly-overview.webp`, width: 1280, height: 1321, device: 'desktop', caption: 'Generate weekly overview', label: L },
      { src: `${base}/p2-03-read-end-of-day-wrap.webp`, width: 1280, height: 1467, device: 'desktop', caption: 'Read end-of-day wrap', label: L },
    ],
  },
  {
    id: 'dispatch',
    number: '03',
    problem: 'Crews, equipment and jobs collide on the schedule',
    tag: 'Weekly dispatch',
    thinking: beats(),
    images: [
      { src: `${base}/p3-01-move-job-with-confirmation.webp`, width: 1280, height: 1080, device: 'desktop', caption: 'Move job with confirmation', label: L },
      { src: `${base}/p3-02-resolve-equipment-conflict.webp`, width: 1267, height: 915, device: 'desktop', caption: 'Resolve equipment conflict', label: L },
      { src: `${base}/p3-03-view-conflict-free-equipment-schedule.webp`, width: 1267, height: 915, device: 'desktop', caption: 'View conflict-free equipment schedule', label: L },
      { src: `${base}/p3-04-view-conflict-free-job-schedule.webp`, width: 1267, height: 915, device: 'desktop', caption: 'View conflict-free job schedule', label: L },
    ],
  },
  {
    id: 'tracking',
    number: '04',
    problem: 'Desk power users work around a dense legacy tool',
    tag: 'Work order tracking',
    thinking: beats(),
    images: [
      { src: `${base}/p4-01-view-work-order-board.webp`, width: 1280, height: 878, device: 'desktop', caption: 'View work order board', label: L },
      { src: `${base}/p4-02-move-work-order-to-in-progress.webp`, width: 1280, height: 878, device: 'desktop', caption: 'Move work order to in progress', label: L },
      { src: `${base}/p4-03-open-new-work-order-form.webp`, width: 1280, height: 878, device: 'desktop', caption: 'Open new work order form', label: L },
      { src: `${base}/p4-04-view-work-order-table.webp`, width: 1280, height: 878, device: 'desktop', caption: 'View work order table', label: L },
    ],
  },
]
