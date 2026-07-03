import type { Metadata } from 'next'
import { ppNeueMontreal } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fox Arias',
  description: 'Fox Arias — foxarias.com',
  icons: {
    icon: '/images/Browser%20Logo.png',
  },
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
