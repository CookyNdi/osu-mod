import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineNoteAlt } from 'react-icons/md';

import { Button } from './ui/button';
import MyTooltip from './ui/my-tooltip';

export default function RequestCard() {
  return (
    <div className='w-full rounded-md overflow-hidden border border-primary/20'>
      <div className='relative w-full h-36'>
        <div className='absolute z-20 right-2 top-2 flex gap-x-2'>
          <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
            <FaCheck className='text-emerald-500' size={20} />
          </Button>
          <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
            190bpm
          </Button>
          <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
            3:56
          </Button>
          <MyTooltip message='This is message example.'>
            <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
              <MdOutlineNoteAlt size={20} />
            </Button>
          </MyTooltip>
        </div>
        <Image
          className='object-cover z-10'
          src={'https://assets.ppy.sh/beatmaps/2163775/covers/cover.jpg?1715059832'}
          alt='Banner'
          fill
        />
      </div>
      <div className='flex flex-col px-4 py-2'>
        <p className='text-sm text-neutral-400'>Request To : SayuMana</p>
        <p className='truncate text-lg font-semibold'>Bleeding Hearts</p>
        <p className='text-sm'>TOGENASHI TOGEARI</p>
      </div>
    </div>
  );
}
