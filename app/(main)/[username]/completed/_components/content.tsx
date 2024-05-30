import { Session } from 'next-auth';

import { RequestData } from '@/types/request';
import ModdingCard from '@/components/modding-card';

type CompletedContentProps = {
  request: RequestData[];
  session: Session | null;
};

export default function CompletedContent({ request, session }: CompletedContentProps) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Completed</h1>
        <p className='text-muted-foreground text-sm'>Total : {request.length}</p>
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
