import { getAllMyRequest } from '@/actions/request/get-all-my-request';
import { redirect } from 'next/navigation';

import Footer from '@/components/layout/footer';
import MyRequestContent from './_components/content';
import { getSession } from '@/lib/session';

export default async function MyRequestPage() {
  const session = await getSession();
  if (!session) return redirect('/auth');
  const request = await getAllMyRequest(session);
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <MyRequestContent request={request} />
      <Footer />
    </div>
  );
}
