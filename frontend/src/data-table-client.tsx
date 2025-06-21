'use client'
import { useMantineTheme } from '@mantine/core'
import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { FormData, MantineHeader } from './types'
import { MantineProvider } from '@mantine/core'

export default function DataTableClient({columns, data} : {
  columns: MantineHeader[],
  data: FormData[]}) {
  const { colorScheme } = useMantineTheme();
  const table = useMantineReactTable({
    columns,
    data,
    mantineTableProps: {
      highlightOnHover: false,
      withColumnBorders: true,
      withBorder: colorScheme === 'dark',
      sx: {
        'thead > tr': { backgroundColor: 'inherit' },
        'thead > tr > th': { backgroundColor: 'inherit' },
        'tbody > tr > td': { backgroundColor: 'inherit' },
      },
    },
  })
  return   ( <MantineProvider
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
                <MantineReactTable table={table} />
            </MantineProvider>)
}
