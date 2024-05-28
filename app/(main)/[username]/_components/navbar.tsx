'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserLayoutNavbar({ username }: { username: string }) {
  const pathname = usePathname();
  const path = pathname.split('/');
  return (
    <div className='flex justify-center items-center gap-x-4 py-2 border-b border-muted-foreground/20'>
      <Link
        href={`/${username}`}
        className={cn('px-2 py-1', pathname.slice(1) === username && 'bg-muted-foreground/10 rounded-md')}
      >
        Queue
      </Link>
      <Link
        href={`/${username}/completed`}
        className={cn('px-2 py-1', path.includes('completed') && 'bg-muted-foreground/10 rounded-md')}
      >
        Completed
      </Link>
      <Link
        href={`/${username}/archives`}
        className={cn('px-2 py-1', path.includes('archives') && 'bg-muted-foreground/10 rounded-md')}
      >
        Archives
      </Link>
    </div>
  );
}
