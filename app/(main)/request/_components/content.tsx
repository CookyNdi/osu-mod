'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { STATUS } from '@prisma/client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModdingCard from '@/components/modding-card';
import { RequestData } from '@/types/request';
import { getAllByFilterMyRequest } from '@/actions/request/get-all-by-filter-my-request';

type MyRequestContentProps = {
  session: Session;
  request: RequestData[];
};

export default function MyRequestContent({ session, request }: MyRequestContentProps) {
  const [requestData, setRequestData] = useState<RequestData[]>(request);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (status) {
      const getAllModderRequest = async () => {
        const filteredRequest = await getAllByFilterMyRequest(session, status as STATUS);
        setRequestData(filteredRequest);
      };
      getAllModderRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className='space-y-2'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-2'>
        <h1 className='text-xl font-bold'>Your Previous Request</h1>
        <Select onValueChange={setStatus}>
          <SelectTrigger className='w-full lg:w-[180px]'>
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
      {requestData.length < 1 ? (
        <div className='w-full h-[80dvh] flex justify-center items-center'>
          <h1 className='capitalize'>You haven&apos;t requested anything to any modder yet.</h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {requestData.map((data) => (
            <ModdingCard request={data} key={data.id} />
          ))}
        </div>
      )}
    </div>
  );
}
