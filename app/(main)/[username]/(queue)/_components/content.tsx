import { Session } from 'next-auth';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RequestData } from '@/types/request';
import ModdingCard from '@/components/modding-card';

type QueueContentProps = {
  request: RequestData[];
  session: Session | null;
};

export default function QueueContent({ request, session }: QueueContentProps) {
  return (
    <div className='space-y-2'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
        <h1 className='text-xl font-semibold'>Queue</h1>
        <div className='flex items-center justify-between sm:justify-normal gap-x-4'>
          <p className='text-muted-foreground'>Total : {request.length}</p>
          <Select>
            <SelectTrigger className='w-[215px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
              <SelectItem value='accepted'>Accepted</SelectItem>
              <SelectItem value='completed'>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {request.length < 1 ? (
        <div className='w-full pt-8 flex justify-center items-center'>
          <h1 className='capitalize'>Modder haven&apos;t get any request yet.</h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {request.map((data) => (
            <ModdingCard
              request={data}
              key={data.id}
              isModderPage
              isEditable={session?.user.name === request[0].user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
}
