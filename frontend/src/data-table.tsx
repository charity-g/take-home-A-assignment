'use client'
import { FormDataWithQuery, MantineHeader } from './types'
import { useMantineTheme } from '@mantine/core'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import PlusButton from './buttons/plus-button'
import StatusButton from './buttons/status-button'
import { ModalTypes } from './types'

const columns: MantineHeader[] = [
  {
    accessorKey: 'question',
    header: 'Question',
  },
  {
    accessorKey: 'answer',
    header: 'Answer',
  },
  {
    accessorKey: 'query',
    header: 'Query',
  },
]

const mantineTableStyling = (isDark: boolean) => ({
  highlightOnHover: true,
  withColumnBorders: false,
  withBorder: false,
  sx: {
    backgroundColor: isDark ? '#232b32' : '#f7fafc',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
    'thead > tr': { backgroundColor: isDark ? '#2d3841' : '#e2e8f0' },
    'thead > tr > th': {
      backgroundColor: isDark ? '#2d3841' : '#e2e8f0',
      fontWeight: 700,
      fontSize: 15,
      color: isDark ? '#bfc9d1' : '#374151',
      border: 'none',
    },
    'tbody > tr': {
      transition: 'background 0.2s',
      '&:nth-of-type(even)': {
        backgroundColor: isDark ? '#28313a' : '#f1f5f9',
      },
      '&:hover': {
        backgroundColor: isDark ? '#47444b' : '#e0e7ef',
        color: isDark ? '#222' : '#222',
      },
    },
    'tbody > tr > td': {
      backgroundColor: 'inherit',
      fontWeight: 500,
      fontSize: 15,
      color: isDark ? '#fff' : '#222',
      border: 'none',
    },
  },
})

export default function DataTable({
  data,
  displayModal,
}: {
  data: FormDataWithQuery[]
  displayModal: (modal: ModalTypes, data: FormDataWithQuery) => void
}) {
  const theme = useMantineTheme()
  const isDark = theme.colorScheme === 'dark'

  const table = useMantineReactTable({
    columns: columns.map(col => {
      // Add custom cell renderers for "Status" and "Action" columns
      if (col.accessorKey === 'query') {
        return {
          ...col,
          Cell: ({ cell }) => {
            const hasQuery = cell.getValue()
            return hasQuery ? (
              <StatusButton
                status={hasQuery['status']}
                onClick={() => {
                  // Handle the click event to view or resolve the query
                  if (hasQuery['status'] === 'OPEN') {
                    displayModal(
                      ModalTypes.View,
                      cell.row.original as FormDataWithQuery
                    )
                  } else {
                    displayModal(
                      ModalTypes.Resolve,
                      cell.row.original as FormDataWithQuery
                    )
                  }
                }}
              />
            ) : (
              <PlusButton
                onClick={() => {
                  displayModal(
                    ModalTypes.Create,
                    cell.row.original as FormDataWithQuery
                  )
                }}
                label="Create Query"
              />
            )
          },
        }
      } else if (col.accessorKey === 'status') {
        return {
          ...col,
          Cell: ({ cell }: { cell: React.ReactNode }) => (
            <span
              style={{
                color: isDark ? '#2dd4bf' : '#0e9488',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {cell.getValue()}
            </span>
          ),
        }
      }
      return col
    }),
    data,
    mantineTableProps: mantineTableStyling(isDark),
  })

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <MantineReactTable table={table} />
      </div>
    </div>
  )
}
