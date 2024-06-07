'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';

import { cn } from '@/lib/utils';
import usePreview from '@/hooks/usePreview';

export default function PreviewPlayer() {
  const { previewUrl, setPreviewUrl } = usePreview();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioPlay, setAudioPlay] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const handleAudioPlaying = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const currentTime = (event.target as HTMLAudioElement).currentTime;
    setAudioCurrentTime(currentTime);
  };

  useEffect(() => {
    setAudioPlay(true);
    if (audioPlay) {
      audioRef.current?.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  useEffect(() => {
    if (audioRef.current?.duration === audioCurrentTime) {
      setPreviewUrl('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioCurrentTime]);

  const handlePlay = () => {
    if (audioPlay) {
      audioRef.current?.pause();
      setAudioPlay(false);
    } else {
      audioRef.current?.play();
      setAudioPlay(true);
    }
  };

  const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    audioRef.current!.volume = newVolume;
  };

  const getVolumeIcon = (volume: number) => {
    if (volume >= 0.5) {
      return FaVolumeUp;
    } else if (volume < 0.5 && volume > 0) {
      return FaVolumeDown;
    } else if (volume === 0) {
      return FaVolumeMute;
    }
    return FaVolumeUp;
  };

  let Icon: IconType = getVolumeIcon(volume);

  const audioCurrent = Math.trunc(audioCurrentTime);
  return (
    <div
      className={cn(
        'fixed z-[100] -bottom-12 left-[50%] translate-x-[-50%] w-[90%] sm:w-[60%] lg:w-[40%] h-12 rounded-t-md flex bg-background/80 backdrop-blur-sm border-t border-x border-primary/20 p-4 animate-in slide-in-from-bottom-12',
        previewUrl && ' bottom-0'
      )}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleAudioPlaying}
        onEnded={handlePlay}
        className='w-full mb-6 hidden'
        controls
        src={previewUrl}
      ></audio>
      <div className='flex justify-center items-center mr-4'>
        <button className='w-full h-full rounded-lg flex justify-center items-center' onClick={() => handlePlay()}>
          {audioPlay === true ? <AiFillPauseCircle size={28} /> : <AiFillPlayCircle size={28} />}
        </button>
      </div>
      <div className='w-[90%] flex items-center gap-x-4'>
        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
          <div className='bg-primary h-2.5 rounded-full' style={{ width: `${audioCurrentTime * 10}%` }}></div>
        </div>
        <span className='text-sm font-medium flex'>{`${audioCurrent}s`}</span>
        <div className='flex gap-x-4 items-center'>
          <Icon className='relative z-0' />
          <input className='w-14' type='range' min='0' max='1' step='0.1' value={volume} onChange={handleVolume} />
        </div>
      </div>
    </div>
  );
}
