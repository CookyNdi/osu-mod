import Footer from '@/components/layout/footer';
import ArchiveContent from './_components/content';
import { getSession } from '@/lib/session';
import { getAllArchiveRequest } from '@/actions/request/get-all-archive-request';

type ArchivesPageProps = {
  params: {
    username: string;
  };
};

export default async function ArchivesPage({ params }: ArchivesPageProps) {
  const username = params.username || '';
  const session = await getSession();
  const request = await getAllArchiveRequest(username);
  return (
    <div className='flex flex-col gap-y-4'>
      <ArchiveContent request={request} session={session} />
      <Footer />
    </div>
  );
}
