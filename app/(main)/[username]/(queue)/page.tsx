import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Footer from '@/components/layout/footer';
import ModdingCard from '@/components/modding-card';

export default function QueuePage() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center'>
        <h1 className='text-xl font-semibold'>Queue</h1>
        <div className='flex items-center justify-between sm:justify-normal gap-x-4'>
          <p className='text-muted-foreground'>Total : 14</p>
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
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <ModdingCard isEditable />
        <ModdingCard isEditable />
        <ModdingCard isEditable />
        <ModdingCard isEditable />
      </div>
      <Footer />
    </div>
  );
}
