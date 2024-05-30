import Image from 'next/image';
import { format } from 'date-fns';
import { FaCheck } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';

import { Button } from './ui/button';
import FormManageRequest from './form-manage-request';
import MapperMessage from './mapper-message';
import { RequestData } from '@/types/request';

import DiffListIcon from './diff-list-icon';
import { getDiffColor } from '@/lib/get-diff-color';
import MyTooltip from './ui/my-tooltip';
import StatusListIcon from './status-list-icon';

type ModdingCardProps = {
  isEditable?: boolean;
  isModderPage?: boolean;
  request: RequestData;
};

export default function ModdingCard({ isEditable, isModderPage, request }: ModdingCardProps) {
  const diffList = request.beatmap.BeatmapSetDiff.sort(
    (a, b) => parseFloat(a.difficulty_rating) - parseFloat(b.difficulty_rating)
  );
  return (
    <div className='w-full rounded-md overflow-hidden border border-primary/20'>
      <div className='relative w-full h-36'>
        <div className='absolute z-20 right-2 top-2 flex gap-x-2'>
          <MyTooltip message={request.status}>
            <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
              <StatusListIcon status={request.status} />
            </Button>
          </MyTooltip>
          <MyTooltip message={`${request.beatmap.bpm} bpm`}>
            <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
              {`${request.beatmap.bpm}bpm`}
            </Button>
          </MyTooltip>
          <MyTooltip message={format(request.beatmap.length * 1000, 'mm:ss')}>
            <Button className='bg-background/70 p-2 backdrop-blur-sm border-none' variant='outline'>
              {format(request.beatmap.length * 1000, 'mm:ss')}
            </Button>
          </MyTooltip>
          <MapperMessage message={request.mapper_message}>
            <Button
              className='bg-background/70 p-2 backdrop-blur-sm border-none'
              variant='outline'
              title='Mapper Message!'
            >
              <FiMessageCircle size={20} />
            </Button>
          </MapperMessage>
        </div>
        {isEditable && (
          <FormManageRequest request={request}>
            <Button
              className='absolute z-20 right-2 bottom-2 bg-background/70 p-2 px-[10px] backdrop-blur-sm border-none'
              variant='outline'
            >
              <FaEdit size={18} />
            </Button>
          </FormManageRequest>
        )}
        <Image
          className='object-cover z-10'
          src={request.beatmap.cover_url || 'https://assets.ppy.sh/beatmaps/2163775/covers/cover.jpg?1715059832'}
          alt='Banner'
          fill
        />
      </div>
      <div className='flex flex-col px-4 py-2'>
        <p className='text-sm text-neutral-400'>
          {!isModderPage ? `Request To : ${request.user.username}` : `Mapset By ${request.beatmap.creator}`}
        </p>
        <p className='truncate text-lg font-semibold'>{request.beatmap.title}</p>
        <p className='text-sm'>{request.beatmap.artist}</p>

        <Button variant='outline' className='flex gap-x-1 bg-muted hover:bg-muted my-2'>
          {diffList.map((data) => (
            <MyTooltip key={data.id} message={data.version}>
              <DiffListIcon mode={data.mode} color={getDiffColor(Number(data.difficulty_rating))} />
            </MyTooltip>
          ))}
        </Button>
      </div>
    </div>
  );
}
