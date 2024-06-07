import { Metadata } from 'next';

import { getAllNotification } from '@/actions/notification/get-all-notification';
import { getSession } from '@/lib/session';
import NotificationList from './_components/notification-list';

export const metadata: Metadata = {
  title: 'Osu Mod | Notification',
};

export default async function NotificationPage() {
  const session = await getSession();
  const notifications = await getAllNotification(session);
  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-[70%] p-4'>
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}
