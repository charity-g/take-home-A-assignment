

import type { Metadata } from 'next'
import './globals.css'


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
    <html lang="en">
      <body
        className='antialiased'
      >
     
        {children}
      </body>
      
    </html>)
}
