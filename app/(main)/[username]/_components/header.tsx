import { FaIdCard } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MyTooltip from '@/components/ui/my-tooltip';
import { Button } from '@/components/ui/button';
import FormRequest from '@/components/form-request';

export default function UserLayoutHeader() {
  return (
    <div className='h-[275px] flex justify-center items-center bg-neutral-500/10 border-b border-muted-foreground/20'>
      <div className='flex flex-col items-center gap-y-2'>
        <Avatar className='w-28 h-28'>
          <AvatarImage src='https://a.ppy.sh/16983379?1677463087.jpeg' />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <div className='relative'>
          <h1 className='text-xl font-semibold'>CookyNdi</h1>
          <MyTooltip message='pansy_286'>
            <FaIdCard className='absolute -right-6 top-0 hover:-top-[2px] transition cursor-pointer' />
          </MyTooltip>
        </div>
        <div className='flex gap-x-4'>
          <p className='text-sm text-muted-foreground'>Ranked : 14</p>
          <p className='text-sm text-muted-foreground'>Loved : 2</p>
          <p className='text-sm text-muted-foreground'>Guest : 20</p>
        </div>
        <FormRequest>
          <Button>Request</Button>
        </FormRequest>
      </div>
    </div>
  );
}
