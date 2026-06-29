interface Project {
  number: string
  role: string
  name: string
  disciplines: string[]
  type: string
  year: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    role: 'Lead Product Designer',
    name: 'FLEET, COST, & CARE',
    disciplines: ['01.1 Product Design', '01.2 UX', '01.3 Design Systems'],
    type: 'Client Work',
    year: '2026',
  },
  {
    number: '02',
    role: 'Senior Product Designer',
    name: 'EVENT CADENCE',
    disciplines: ['02.1 Product Design', '02.2 Design Systems', '02.3 Branding'],
    type: 'In-house',
    year: '2019-2026',
  },
  {
    number: '03',
    role: 'Lead Product Designer',
    name: 'SENTRI',
    disciplines: ['03.1 Product Design', '03.2 UX'],
    type: 'Client Work',
    year: '2025',
  },
  {
    number: '04',
    role: 'Product Designer',
    name: 'SOLO.AI',
    disciplines: ['04.1 Web Design', '04.2 Strategy'],
    type: 'Client Work',
    year: '2026',
  },
  {
    number: '05',
    role: 'Editor + Co-Founder',
    name: 'TANDEM MAGAZINE',
    disciplines: ['05.1 Editorial', '05.2 Art Direction', '05.3 Arts Writing', '05.4 Cultural Criticism'],
    type: 'Press',
    year: '2025-Present',
  },
  {
    number: '06',
    role: 'Writer',
    name: 'DAZED, INTERVIEW, METAL ETC.',
    disciplines: ['06.1 Arts Writing', '06.2 Cultural Criticism'],
    type: 'Press',
    year: '2024-Present',
  },
]

export default function ProjectsTable() {
  return (
    <section style={{ backgroundColor: '#000000', fontSize: '12px', lineHeight: '16px', fontWeight: 500, color: '#ffffff' }}>
      {PROJECTS.map(project => (
        <div key={project.number}>
          <div style={{ marginInline: '40px', borderTop: '1px solid #333333' }} />
          <div
            className="grid-12"
            style={{ paddingBlock: '12px', paddingInline: '40px', alignItems: 'start' }}
          >
            <div style={{ gridColumn: '1 / 2' }}>{project.number}</div>
            <div style={{ gridColumn: '2 / 4' }}>{project.role}</div>
            <div style={{ gridColumn: '4 / 6' }}>{project.name}</div>
            <div style={{ gridColumn: '6 / 10', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {project.disciplines.map(d => <span key={d}>{d}</span>)}
            </div>
            <div style={{ gridColumn: '10 / 12' }}>{project.type}</div>
            <div style={{ gridColumn: '12 / 13' }}>{project.year}</div>
          </div>
        </div>
      ))}
      <div style={{ marginInline: '40px', borderTop: '1px solid #333333' }} />
    </section>
  )
}
