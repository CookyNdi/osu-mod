import Link from 'next/link';

import Profile from './profile';
import { Button } from '../ui/button';
import { getSession } from '@/lib/session';
import Notification from './notification';
import { getUnReadNotification } from '@/actions/notification/get-un-read-notification';
import ToolsNav from './tools';

export default async function Navbar() {
  const session = await getSession();
  const notifications = await getUnReadNotification(session);
  return (
    <div className='w-full h-[60px] bg-background/20 backdrop-blur-sm flex justify-between items-center p-2 px-4 lg:px-8 fixed z-[100] border-b border-primary/50'>
      <Link href={'/'}>Modmap</Link>
      <div className='flex items-center gap-x-4 lg:gap-x-6'>
        {session && (
          <div className='flex gap-x-4 items-center cursor-pointer'>
            <Link href={'/request'} className='cursor-pointer'>
              My Request
            </Link>
            <Notification notifications={notifications} />
            <ToolsNav />
          </div>
        )}
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
