'use client'
import { FormData, MantineHeader } from './types'
import { useMantineTheme } from '@mantine/core'
import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'

const columns : MantineHeader[] = [
    {
      accessorKey: 'question',
      header: 'Question',
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
    },
];

export default function DataTable({data} : {
  data: FormData[]}) {
    const theme = useMantineTheme();
    
      const isDark = theme.colorScheme === 'dark';
    
      const table = useMantineReactTable({
        columns: columns.map(col => {
          // Add custom cell renderers for "Status" and "Action" columns
          if (col.accessorKey === 'status') {
            return {
              ...col,
              Cell: ({ cell } : {cell: React.ReactNode}) => (
                <span
                  style={{
                    background: isDark ? '#3b2323' : '#f8d7da',
                    color: isDark ? '#ffb4b4' : '#c82333',
                    borderRadius: 12,
                    padding: '2px 12px',
                    fontWeight: 600,
                    fontSize: 14,
                    display: 'inline-block',
                  }}
                >
                  {cell.getValue()}
                </span>
              ),
            };
          }
          if (col.accessorKey === 'action') {
            return {
              ...col,
              Cell: ({ cell } : {cell: React.ReactNode}) => (
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
            };
          }
          return col;
        }),
        data,
        mantineTableProps: {
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
        },
      });
    
  

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
          
        <MantineReactTable table={table} />
      </div>
    </div>
  )
}
