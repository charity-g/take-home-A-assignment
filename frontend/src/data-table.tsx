'use client'

import { useMemo, useState } from 'react'
import import_data from '../form_data.json'
import { FormData } from './types'
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table'
import { useMantineTheme } from '@mantine/core'

export default function DataTable() {
  const { colorScheme } = useMantineTheme();
  const [data, setData] = useState<FormData[]>(import_data as FormData[])

  const columns = useMemo<MRT_ColumnDef<FormData>[]>(
    () => [
      {
        accessorKey: 'question',
        header: 'Question',
      },
      {
        accessorKey: 'answer',
        header: 'Answer',
      },
    ],
    []
  )

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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <MantineReactTable table={table} />
      </div>
    </div>
  )
}
