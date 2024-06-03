import { getAllModderRequest } from '@/actions/request/get-all-modder-request';
import { getSession } from '@/lib/session';

import Footer from '@/components/layout/footer';
import QueueContent from './_components/content';

type QueuePageProps = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: QueuePageProps) {
  return {
    title: `${params.username} - Queue`,
  };
}

export default async function QueuePage({ params }: QueuePageProps) {
  const username = params.username || '';
  const session = await getSession();
  const request = await getAllModderRequest(username);
  return (
    <div className='flex flex-col gap-y-4'>
      <QueueContent request={request} session={session} />
      <Footer />
    </div>
  );
}
