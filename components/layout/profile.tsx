import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Profile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage src='https://a.ppy.sh/16983379?1677463087.jpeg' />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 z-[120]' align='end'>
        <div>
          <DropdownMenuLabel>CookyNdi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={'/settings'}>
            <DropdownMenuItem className='cursor-pointer'>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem className='cursor-pointer'>Log out</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
