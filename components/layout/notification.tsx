'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdNotifications } from 'react-icons/io';
import { formatDistanceToNow } from 'date-fns';
import { FaCheck } from 'react-icons/fa6';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { notifications } from '@/types/notification';
import { readNotification } from '@/actions/notification/read-notification';
import { bulkReadNotification } from '@/actions/notification/bulk-read-notification';
import { ScrollArea } from '../ui/scroll-area';
import { useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';

type NotificationProps = {
  notifications: notifications[];
};

export default function Notification({ notifications }: NotificationProps) {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative'>
          <IoMdNotifications size={24} />
          {notifications.length > 0 && <span className='absolute bg-red-600 p-[5px] rounded-full top-0 right-0'></span>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-96 z-[120] p-4' align='end' sideOffset={10}>
        <div className='flex justify-between items-center'>
          <DropdownMenuLabel>Notification</DropdownMenuLabel>
          <p
            className={cn('text-muted-foreground underline text-sm cursor-pointer')}
            onClick={() => bulkMarkAsRead(notifications[0]?.userId)}
          >
            Clear All
          </p>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className='w-full h-[288px]'>
          {notifications.length < 1 ? (
            <div className='mt-4 flex justify-center items-center'>
              <h1 className='text-sm text-muted-foreground'>Notification Is Empty!</h1>
            </div>
          ) : (
            <>
              {notifications.map((data) => (
                <div
                  className='flex mt-4 group bg-muted/50 rounded-md p-0 py-0 space-x-2 overflow-hidden'
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
                    <div className='flex flex-col py-2'>
                      <p className='text-sm'>
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
                    <div className='w-[15%]'>
                      <FaCheck
                        size={24}
                        className={cn('cursor-pointer hidden group-hover:block')}
                        onClick={() => markAsRead(data.id)}
                        title='mark as read'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
