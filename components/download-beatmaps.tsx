'use client';

import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { downloadUrl } from '@/lib/download-url';
import { Switch } from './ui/switch';

type DownloadBeatmapsProps = {
  children: React.ReactNode;
  beatmapsetId: number;
};
export type option = 'osu' | 'chimu' | 'beatconnect' | 'sayobot' | 'nerinyan' | 'mino';

export default function DownloadBeatmaps({ children, beatmapsetId }: DownloadBeatmapsProps) {
  const [option, setOption] = useState<string>('');
  const [isNoVideo, setIsNoVideo] = useState<boolean>(false);

  const url = downloadUrl({ option, beatmapsetId, isNoVideo });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Beatmaps</DialogTitle>
        </DialogHeader>
        <div className='w-full flex flex-col gap-y-4'>
          <div className='grid grid-cols-4 items-center'>
            <Label htmlFor='source-download'>Source</Label>
            <Select onValueChange={setOption}>
              <SelectTrigger className='col-span-3' id='source-download'>
                <SelectValue placeholder='Source Download' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='nerinyan' className='capitalize'>
                  nerinyan
                </SelectItem>
                <SelectItem value='sayobot' className='capitalize'>
                  sayobot
                </SelectItem>
                <SelectItem value='mino' className='capitalize'>
                  mino
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center'>
            <Label htmlFor='isAccepted'>No Video</Label>
            <Switch id='isAccepted' className='col-span-3' checked={isNoVideo} onCheckedChange={setIsNoVideo} />
          </div>
          <Button className='w-full' onClick={() => window.open(url, '_blank')}>
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
