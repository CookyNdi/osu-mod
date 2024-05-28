'use client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from '@prisma/client';

type HomeContentsProps = {
  users: (Users & {
    Settings: {
      open: boolean;
      modes: string[];
      modder_type: string;
    }[];
  })[];
};

export default function HomeContents({ users }: HomeContentsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
      {users.map((data) => (
        <Card key={data.id}>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle className='truncate'>{data.username}</CardTitle>
              <p>{data.Settings[0].open ? 'Open' : 'Closed'}</p>
            </div>
            <CardDescription>
              <p className='text-foreground capitalize'>{data.Settings[0].modder_type}</p>
              <p className='text-xs'>{`Last Seen ${formatDistanceToNow(data.last_action, {
                addSuffix: true,
                includeSeconds: true,
              })}`}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-end'>
            <Link href={`/${data.username}`}>
              <Button>Queue</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
