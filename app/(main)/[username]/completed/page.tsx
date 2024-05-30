import Footer from '@/components/layout/footer';
import CompletedContent from './_components/content';
import { getSession } from '@/lib/session';
import { getAllModdedRequest } from '@/actions/request/get-all-modded-request';

type CompletedPageProps = {
  params: {
    username: string;
  };
};

export default async function CompletedPage({ params }: CompletedPageProps) {
  const username = params.username || '';
  const session = await getSession();
  const request = await getAllModdedRequest(username);
  return (
    <div className='flex flex-col gap-y-4'>
      <CompletedContent request={request} session={session} />
      <Footer />
    </div>
  );
}
