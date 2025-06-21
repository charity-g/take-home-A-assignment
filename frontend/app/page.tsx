'use client'
import { MantineProvider } from '@mantine/core'

import DataTable from '@/src/data-table'
import Header from '@/src/header'

export default function Home() {
  return (
    <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              fontFamily: 'var(--font-sans)',
              headings: { fontFamily: 'var(--font-mono)' },
              components: {
                Button: {
                  defaultProps: {
                    variant: 'default',
                  },
                },
              },
            }}
            >
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <DataTable />
      </div>
    </div>
    
    </MantineProvider>
  )
}
