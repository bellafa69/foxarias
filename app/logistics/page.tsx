import type { Metadata } from 'next'
import LogisticsLanding from '@/components/logistics/LogisticsLanding'

export const metadata: Metadata = {
  title: 'Isabella Fox Arias · UX/UI consultant for fleet and logistics software',
  description: 'Fleet software has to work at the desk and in the field.',
}

export default function LogisticsPage() {
  return <LogisticsLanding />
}
