'use client'
import {
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { FormData, MantineHeader } from './types'
import { use } from 'react'

export default function DataTableClient({columns, dataPromise} : {
  columns: MantineHeader[],
  dataPromise: Promise<FormData[]>}) {
  const data = use(dataPromise);

  const table = useMantineReactTable({
    columns: columns.map(col => {
      // Add custom cell renderers for "Status" and "Action" columns
      if (col.accessorKey === 'status') {
        return {
          ...col,
          Cell: ({ cell }: any) => (
            <span
              style={{
                background: '#f8d7da',
                color: '#c82333',
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
          Cell: ({ cell }: any) => (
            <span
              style={{
                color: '#2dd4bf',
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
        backgroundColor: '#232b32',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
        'thead > tr': { backgroundColor: '#2d3841' },
        'thead > tr > th': { 
          backgroundColor: '#2d3841',
          fontWeight: 700,
          fontSize: 15,
          color: '#bfc9d1',
          border: 'none',
        },
        'tbody > tr': {
          transition: 'background 0.2s',
          '&:nth-of-type(even)': {
            backgroundColor: '#28313a',
          },
          '&:hover': {
            backgroundColor: '#47444b',
            color: '#222',
          },
        },
        'tbody > tr > td': { 
          backgroundColor: 'inherit',
          fontWeight: 500,
          fontSize: 15,
          color: '#fff',
          border: 'none',
        },
      },
    },
  });

  return (
    <MantineReactTable table={table} />
  );
}