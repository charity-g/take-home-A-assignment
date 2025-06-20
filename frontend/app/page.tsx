import Image from "next/image";
import DataTable from "@/src/data-table";

export default function Home() {
  return (
    <div className='min-h-screen'>
    <div className="container mx-auto p-6">
      
      <DataTable />

    </div>
    </div>
  );
}
