import { getAllActiveModders } from '@/actions/user/get-all-active-modders';
import HomeContents from './_components/content';
import HomeContentFilters from './_components/filters';
import { getSession } from '@/lib/session';

export default async function Home() {
  const session = await getSession();
  const users = await getAllActiveModders();
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <HomeContentFilters />
      {users.length < 1 ? (
        <div className='flex justify-center items-center'>
          <h1 className='text-lg text-muted-foreground'>there`s nobody here.</h1>
        </div>
      ) : (
        <HomeContents users={users} session={session} />
      )}
    </div>
  );
}
