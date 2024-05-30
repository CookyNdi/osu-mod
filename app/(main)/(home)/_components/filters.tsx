// import { MdFilterList } from 'react-icons/md';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

export default function HomeContentFilters() {
  return (
    <div className='flex flex-col lg:flex-row justify-between gap-y-2'>
      <Input className='w-full lg:w-[280px] hidden' placeholder='Search...' />
      <div className='flex gap-x-4'>
        <Select>
          <SelectTrigger className='w-full lg:w-[180px] hidden'>
            <SelectValue placeholder='Mode' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='osu'>Osu</SelectItem>
            <SelectItem value='mania'>Mania</SelectItem>
            <SelectItem value='catch'>catch</SelectItem>
            <SelectItem value='taiko'>Taiko</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='w-full lg:w-[180px] hidden'>
            <SelectValue placeholder='Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='modders'>Modders</SelectItem>
            <SelectItem value='beatmap-nominator'>Beatmap Nominator</SelectItem>
          </SelectContent>
        </Select>
        {/* <Button variant='outline'>
          <MdFilterList size={20} />
        </Button> */}
      </div>
    </div>
  );
}
