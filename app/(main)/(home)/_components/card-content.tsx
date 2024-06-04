import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UsersType } from '@/types/users';
import FormRequest from '@/components/form-request';
import { Session } from 'next-auth';

type CardContentProsp = {
  data: UsersType;
  session: Session | null;
};

export default function HomeCardContent({ data, session }: CardContentProsp) {
  return (
    <Card key={data.id}>
      <Link href={`/${data.username}`}>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='truncate'>{data.username}</CardTitle>
            <p>{data.Settings[0].open ? 'Open' : 'Closed'}</p>
          </div>
          <CardDescription className='flex flex-col'>
            <span className='text-foreground capitalize'>{data.Settings[0].modder_type}</span>
            <span className='text-xs'>{`Last Seen ${formatDistanceToNow(data.last_action, {
              addSuffix: true,
              includeSeconds: true,
            })}`}</span>
          </CardDescription>
        </CardHeader>
      </Link>
      <CardContent className='flex justify-end'>
        {data.username !== session?.user.name && (
          <FormRequest targetUserId={data.id} username={data.username}>
            <Button disabled={!!!data.Settings[0].open || !session} className='disabled:cursor-not-allowed'>
              Request
            </Button>
          </FormRequest>
        )}
      </CardContent>
    </Card>
  );
}
