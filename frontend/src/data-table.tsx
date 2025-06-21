'use server'
import { FormData, MantineHeader } from './types'
import { Suspense } from 'react'
import DataTableClient from './data-table-client'

export default async function DataTable() {
  const response = await fetch('http://127.0.0.1:8080/form-data');
  const data = (await response.json())['data']['formData'] as FormData[];
  console.log('Data fetched:', data);

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
          <DataTableClient columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  )
}
