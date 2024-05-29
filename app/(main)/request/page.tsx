import { getAllMyRequest } from '@/actions/request/get-all-my-request';

import Footer from '@/components/layout/footer';
import MyRequestContent from './_components/content';

export default async function MyRequestPage() {
  const request = await getAllMyRequest();
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <MyRequestContent request={request} />
      <Footer />
    </div>
  );
}
