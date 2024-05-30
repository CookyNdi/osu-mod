'use client';
import Link from 'next/link';
import { Session } from 'next-auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';

type ProfileProps = {
  session: Session;
};

export default function Profile({ session }: ProfileProps) {
  const onClick = () => {
    signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage src={session?.user?.image || 'https://a.ppy.sh/16983379?1677463087.jpeg'} />
          <AvatarFallback>{session.user?.name?.slice(0, 1) || 'A'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 z-[120]' align='end'>
        <div>
          <DropdownMenuLabel>{session.user?.name || ''}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/${session.user.name}`}>
            <DropdownMenuItem className='cursor-pointer'>Your Page</DropdownMenuItem>
          </Link>
          <Link href={"/rules"}>
            <DropdownMenuItem className='cursor-pointer'>Edit Rules</DropdownMenuItem>
          </Link>
          <Link href={'/settings'}>
            <DropdownMenuItem className='cursor-pointer'>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem className='cursor-pointer' onClick={onClick}>
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
