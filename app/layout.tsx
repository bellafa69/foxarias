import type { Metadata } from 'next'
import { ppNeueMontreal } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fox Arias',
  description: 'Fox Arias — foxarias.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={ppNeueMontreal.variable}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
