'use client';
import Link from 'next/link';
import { Session } from 'next-auth';
import { FaUser } from 'react-icons/fa';
import { MdOutlineNoteAlt } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';

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
            <DropdownMenuItem className='cursor-pointer grid items-center grid-cols-10'>
              <FaUser size={19} className='col-span-2' />
              <span className='col-span-8'>Your Page</span>
            </DropdownMenuItem>
          </Link>
          <Link href={'/rules'}>
            <DropdownMenuItem className='cursor-pointer grid items-center grid-cols-10'>
              <MdOutlineNoteAlt size={20} className='col-span-2' />
              <span className='col-span-8'>Edit Rules</span>
            </DropdownMenuItem>
          </Link>
          <Link href={'/settings'}>
            <DropdownMenuItem className='cursor-pointer grid items-center grid-cols-10'>
              <IoSettingsSharp size={19} className='col-span-2' />
              <span className='col-span-8'>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className='cursor-pointer grid items-center grid-cols-10' onClick={onClick}>
            <BiLogOut size={20} className='col-span-2' />
            <span className='col-span-8'>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
