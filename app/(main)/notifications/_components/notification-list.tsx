'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { notifications } from '@/types/notification';
import { formatDistanceToNow } from 'date-fns';
import { FaCheck } from 'react-icons/fa';
import { readNotification } from '@/actions/notification/read-notification';
import { bulkReadNotification } from '@/actions/notification/bulk-read-notification';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type NotificationListProps = {
  notifications: notifications[];
};

export default function NotificationList({ notifications }: NotificationListProps) {
  const router = useRouter();
  const { toast } = useToast();

  const markAsRead = (notificationId: string) => {
    readNotification(notificationId)
      .then((data) => {
        if (data.error) {
          toast({
            title: data.error,
          });
        }
        if (data.success) {
          toast({
            title: data.success,
          });
          router.refresh();
        }
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
        });
      });
  };

  const bulkMarkAsRead = (userId: string) => {
    if (userId) {
      bulkReadNotification(userId)
        .then((data) => {
          if (data.error) {
            toast({
              title: data.error,
            });
          }
          if (data.success) {
            toast({
              title: data.success,
            });
            router.refresh();
          }
        })
        .catch(() => {
          toast({
            title: 'Something went wrong',
          });
        });
    }
  };

  const unReadNotification = notifications.filter((item) => !item.isRead);

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>
          Notification{' '}
          <span className='text-base text-muted-foreground font-medium'>{`(${unReadNotification.length} is unread)`}</span>
        </h1>
        <p
          className={cn('text-muted-foreground underline text-sm cursor-pointer')}
          onClick={() => bulkMarkAsRead(notifications[0]?.userId)}
        >
          Read All
        </p>
      </div>
      {notifications.length < 1 ? (
        <div className='mt-4 flex justify-center items-center'>
          <h1 className='text-sm text-muted-foreground'>Notification Is Empty!</h1>
        </div>
      ) : (
        <>
          {notifications.map((data) => (
            <div
              className={cn(
                'flex mt-4 group bg-muted rounded-md p-0 py-0 space-x-2 overflow-hidden',
                data.isRead && 'bg-muted/30'
              )}
              key={data.id}
            >
              <div className='relative w-[25%] h-20 overflow-hidden'>
                <div className='absolute bg-background/20 top-0 left-0 z-20 w-full h-full' />
                <Image
                  className='object-cover z-10'
                  src={data.request.beatmap.cover_url}
                  alt={data.request.beatmap.title}
                  fill
                />
              </div>
              <div className='w-[75%] flex justify-between items-center'>
                <div className='h-full flex flex-col justify-between py-2'>
                  <p className='text-sm lg:text-lg'>
                    {data.type === 'CHANGE_STATUS'
                      ? `Beatmap ${data.request.beatmap.title} ${data.message} ${data.request.status}`
                      : `${data.message} ${data.request.beatmap.title}`}
                  </p>
                  <p className='text-muted-foreground text-sm'>
                    {formatDistanceToNow(data.createdAt, {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </p>
                </div>
                <div className='w-[5%] hidden lg:flex'>
                  {!data.isRead && (
                    <FaCheck
                      size={24}
                      className={cn('cursor-pointer hidden group-hover:block')}
                      onClick={() => markAsRead(data.id)}
                      title='mark as read'
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
