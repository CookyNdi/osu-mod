import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAllMyRequest } from '@/actions/request/get-all-my-request';
import Footer from '@/components/layout/footer';
import MyRequestContent from './_components/content';
import { getSession } from '@/lib/session';

export const metadata: Metadata = {
  title: 'Modmap | My Request',
};

export default async function MyRequestPage() {
  const session = await getSession();
  if (!session) return redirect('/auth');
  const request = await getAllMyRequest(session);
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <MyRequestContent request={request} session={session} />
      <Footer />
    </div>
  );
}
