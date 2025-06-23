import { getFormData } from '@/src/actions/actions';
import { Suspense } from 'react';
import ManageFormDataApp from '@/src/manage-form-data-app';

export default async function Home() {

  const data = getFormData();
  return (
    <div className="min-h-screen">
      
        <Suspense fallback={<div>Loading...</div>}>
          <ManageFormDataApp dataPromise={data} />
        </Suspense>
    </div>
  )
}
