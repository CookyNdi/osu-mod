import { getAllActiveModders } from '@/actions/user/get-all-active-modders';
import HomeContents from './_components/content';
import { getSession } from '@/lib/session';

export default async function Home() {
  const session = await getSession();
  const users = await getAllActiveModders();
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <HomeContents users={users} session={session} />
    </div>
  );
}
