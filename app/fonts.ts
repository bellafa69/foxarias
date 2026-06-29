import localFont from 'next/font/local'

export const ppNeueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/PPNeueMontreal-Thin.woff2.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontreal-Book.woff2.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontreal-Italic.woff2.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/PPNeueMontreal-Medium.woff2.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontreal-Bold.woff2.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pp-neue-montreal',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})
