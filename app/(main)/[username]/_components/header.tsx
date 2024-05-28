import { FaIdCard } from 'react-icons/fa';
import { Users } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MyTooltip from '@/components/ui/my-tooltip';
import { Button } from '@/components/ui/button';
import FormRequest from '@/components/form-request';

type UserLayoutHeaderProps = {
  user: Users & {
    Settings: {
      open: boolean;
      modes: string[];
      modder_type: string;
    }[];
  };
};

export default function UserLayoutHeader({ user }: UserLayoutHeaderProps) {
  return (
    <div className='h-[285px] flex justify-center items-center bg-neutral-500/10 border-b border-muted-foreground/20'>
      <div className='flex flex-col items-center gap-y-2'>
        <Avatar className='w-28 h-28'>
          <AvatarImage src={user.avatar_url || 'https://a.ppy.sh/16983379?1677463087.jpeg'} />
          <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className='relative'>
          <h1 className='text-xl font-semibold'>{user.username}</h1>
          <MyTooltip message={user.previous_usernames.join(', ')}>
            <FaIdCard className='absolute -right-6 top-0 hover:-top-[2px] transition cursor-pointer' />
          </MyTooltip>
        </div>
        <p className='text-lg text-foreground'>{user.Settings[0].modder_type}</p>
        <div className='flex gap-x-4'>
          <p className='text-sm text-muted-foreground'>Ranked : {user.ranked_beatmapset_count}</p>
          <p className='text-sm text-muted-foreground'>Loved : {user.loved_beatmapset_count}</p>
          <p className='text-sm text-muted-foreground'>Guest : {user.guest_beatmapset_count}</p>
        </div>
        <FormRequest>
          <Button disabled={!user.Settings[0].open} className='disabled:cursor-not-allowed'>Request</Button>
        </FormRequest>
      </div>
    </div>
  );
}
