import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModdingCard from '@/components/modding-card';
import Footer from '@/components/layout/footer';

export default function MyRequestPage() {
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-y-2'>
        <h1 className='text-xl font-bold'>Your Request Previously</h1>
        <Select>
          <SelectTrigger className='w-full lg:w-[180px]'>
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
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <ModdingCard />
        <ModdingCard />
        <ModdingCard />
        <ModdingCard />
      </div>
      <Footer />
    </div>
  );
}
