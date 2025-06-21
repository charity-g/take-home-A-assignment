
import DataTable from '@/src/data-table'
import Header from '@/src/header'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <DataTable />
      </div>
    </div>
  )
}
