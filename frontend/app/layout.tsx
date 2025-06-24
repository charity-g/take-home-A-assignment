import type { Metadata } from 'next'
import './globals.css'
import { Noto_Sans, Poppins, Inclusive_Sans } from 'next/font/google'

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto-sans' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-poppins',
})
const inclusiveSans = Inclusive_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-inclusive-sans',
})

export const metadata: Metadata = {
  title: 'Query Manager - Created by Charity Grey 2025',
  description: 'Vial - Query Management Application - Created by Charity Grey',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${poppins.variable} ${inclusiveSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
