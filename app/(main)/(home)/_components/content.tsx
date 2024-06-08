'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UsersType } from '@/types/users';

import { getAllByFilterActiveModders } from '@/actions/user/get-all-by-filter-active-modders';
import HomeCardContent from './card-content';

type HomeContentsProps = {
  users: UsersType[];
  session: Session | null;
};

export default function HomeContents({ users, session }: HomeContentsProps) {
  const [userDatas, setUserDatas] = useState<UsersType[]>(users);
  const [filteredUserData, setFilteredUserData] = useState<UsersType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const [type, setType] = useState<string>('');

  useEffect(() => {
    if (mode || type) {
      const getAllActiveModders = async () => {
        const filteredUsers = await getAllByFilterActiveModders(!mode ? ['osu'] : [mode], type);
        setUserDatas(filteredUsers);
      };
      getAllActiveModders();
    }
  }, [mode, type]);

  useEffect(() => {
    if (query) {
      const filterUserDatas = () => {
        const filter = userDatas.filter((data) => data.username.toLowerCase().startsWith(query.toLowerCase()));
        setFilteredUserData(filter);
      };
      filterUserDatas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between gap-y-2'>
        <Input
          className='w-full lg:w-[280px]'
          placeholder='Search...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='flex gap-x-4'>
          <Select onValueChange={setMode}>
            <SelectTrigger className='w-full lg:w-[180px]'>
              <SelectValue placeholder='Mode' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='osu'>Osu</SelectItem>
              <SelectItem value='mania'>Mania</SelectItem>
              <SelectItem value='catch'>catch</SelectItem>
              <SelectItem value='taiko'>Taiko</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setType}>
            <SelectTrigger className='w-full lg:w-[180px]'>
              <SelectValue placeholder='Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='modder'>Modders</SelectItem>
              <SelectItem value='Beatmap Nominator'>Beatmap Nominator</SelectItem>
              <SelectItem value='Probationary BN'>Probationary BN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {query ? (
        <>
          {filteredUserData.length < 1 ? (
            <div className='flex justify-center items-center'>
              <h1 className='text-lg text-muted-foreground'>there`s nobody here.</h1>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
              {filteredUserData.map((data) => (
                <HomeCardContent key={data.id} data={data} session={session} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {userDatas.length < 1 ? (
            <div className='flex justify-center items-center'>
              <h1 className='text-lg text-muted-foreground'>there`s nobody here.</h1>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
              {userDatas.map((data) => (
                <HomeCardContent key={data.id} data={data} session={session} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
