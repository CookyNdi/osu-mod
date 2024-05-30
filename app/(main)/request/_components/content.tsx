import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModdingCard from '@/components/modding-card';
import { RequestData } from '@/types/request';

type MyRequestContentProps = {
  request: RequestData[];
};

export default function MyRequestContent({ request }: MyRequestContentProps) {
  return (
    <div className='space-y-2'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-2'>
        <h1 className='text-xl font-bold'>Your Request Previously</h1>
        <Select>
          <SelectTrigger className='w-full lg:w-[180px] hidden'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='accepted'>Accepted</SelectItem>
            <SelectItem value='rejected'>Rejected</SelectItem>
            <SelectItem value='finished'>Finished</SelectItem>
            <SelectItem value='modded'>Modded</SelectItem>
            <SelectItem value='nominted'>Nominated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {request.length < 1 ? (
        <div className='w-full h-[80dvh] flex justify-center items-center'>
          <h1 className='capitalize'>You haven&apos;t requested anything to any modder yet.</h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {request.map((data) => (
            <ModdingCard request={data} key={data.id} />
          ))}
        </div>
      )}
    </div>
  );
}
