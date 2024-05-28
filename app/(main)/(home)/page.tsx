import { getAllActiveModders } from '@/actions/user/get-all-active-modders';
import HomeContents from './_components/content';
import HomeContentFilters from './_components/filters';

export default async function Home() {
  const users = await getAllActiveModders();
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <HomeContentFilters />
      <HomeContents users={users} />
    </div>
  );
}
