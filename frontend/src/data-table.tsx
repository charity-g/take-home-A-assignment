export default function DataTable() {

    return (
         <div
          className='rounded-lg border overflow-hidden'>
            <table className="w-full">
                <thead>
              <tr className="bg-gray-700 border-gray-600 border-b">
                <th className="text-left py-4 px-6 font-medium text-gray-300">
                  Table Header
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">
                  Table Header
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">
                  Table Header
                </th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
          </div>
    )

}