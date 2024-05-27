import Link from 'next/link';

import Profile from './profile';
import { Button } from '../ui/button';
import { getSession } from '@/lib/session';

export default async function Navbar() {
  const session = await getSession();
  return (
    <div className='w-full h-[60px] bg-background/20 backdrop-blur-sm flex justify-between items-center p-2 px-4 lg:px-8 fixed z-[100] border-b border-primary/50'>
      <Link href={'/'}>Osu Modding</Link>
      <div className='flex items-center gap-x-4 lg:gap-x-6'>
        <Link href={'/request'} className='cursor-pointer'>
          My Request
        </Link>
        {session ? (
          <Profile session={session} />
        ) : (
          <Link href={'/auth'}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
