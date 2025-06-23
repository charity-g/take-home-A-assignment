'use server'
import { FormData, MantineHeader } from './types'
import { Suspense } from 'react'
import DataTableClient from './data-table-client'
import { getFormData } from './actions/actions';

export default async function DataTable() {
  const data = getFormData();
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTableClient columns={columns} dataPromise={data} />
        </Suspense>
      </div>
    </div>
  )
}
