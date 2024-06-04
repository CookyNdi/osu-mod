'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { STATUS } from '@prisma/client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RequestData } from '@/types/request';
import ModdingCard from '@/components/modding-card';
import { getAllByFilterModderRequest } from '@/actions/request/get-all-by-filter-modder-request';

type QueueContentProps = {
  request: RequestData[];
  session: Session | null;
  username: string;
};

export default function QueueContent({ request, session, username }: QueueContentProps) {
  const [requestData, setRequestData] = useState<RequestData[]>(request);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    setRequestData(request);
  }, [request]);

  useEffect(() => {
    if (status) {
      const getAllModderRequest = async () => {
        const filteredRequest = await getAllByFilterModderRequest(username, status as STATUS);
        setRequestData(filteredRequest);
      };
      getAllModderRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className='space-y-2'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
        <h1 className='text-xl font-semibold'>Queue</h1>
        <div className='flex items-center justify-between sm:justify-normal gap-x-4'>
          <p className='text-muted-foreground'>Total : {request.length}</p>
          <Select onValueChange={setStatus}>
            <SelectTrigger className='w-[215px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='PENDING'>Pending</SelectItem>
              <SelectItem value='REJECTED'>Rejected</SelectItem>
              <SelectItem value='ACCEPTED'>Accepted</SelectItem>
              <SelectItem value='MODDED'>Completed</SelectItem>
              <SelectItem value='NOMINATED'>Nominated</SelectItem>
              <SelectItem value='RANKED'>Ranked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {requestData.length < 1 ? (
        <div className='w-full pt-8 flex justify-center items-center'>
          <h1 className='capitalize'>Modder haven&apos;t get any request yet.</h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {requestData.map((data) => (
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
