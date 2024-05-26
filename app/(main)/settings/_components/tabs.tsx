'use client';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsTabs() {
  const [mode, setMode] = useState<string[]>([]);
  const deleteMode = (index: number) => {
    const newArray = [...mode.slice(0, index), ...mode.slice(index + 1)];
    setMode(newArray);
  };
  return (
    <Tabs defaultValue='queue_setting' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='queue_setting'>Queue Settings</TabsTrigger>
        <TabsTrigger value='more'>More</TabsTrigger>
      </TabsList>
      <TabsContent value='queue_setting'>
        <Card>
          <CardHeader>
            <CardDescription>Make changes to your queue modding here. Click save when youre done.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex items-center gap-x-4 mb-2'>
              <Label htmlFor='queue_status'>Queue Open</Label>
              <Switch id='queue_status' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='mode'>Mode</Label>
              <Select
                onValueChange={(value) => {
                  if (!mode.includes(value)) {
                    setMode([...mode, value]);
                  }
                }}
              >
                <SelectTrigger id='mode' className='w-full'>
                  <SelectValue placeholder='Mode' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='standard'>Standard</SelectItem>
                  <SelectItem value='mania'>Mania</SelectItem>
                  <SelectItem value='taiko'>Taiko</SelectItem>
                  <SelectItem value='catch'>Catch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {mode.length > 0 && (
              <div className='flex gap-2'>
                {mode.map((item, index) => (
                  <Button variant='outline' className='relative group' key={item} onClick={() => deleteMode(index)}>
                    {item}
                    <IoMdClose
                      className='absolute hidden group-hover:block z-10 top-[50%] -right-[10px] translate-y-[-50%] animate-in slide-in-from-top-2 spin-in-90 hover:text-red-500'
                      size={20}
                    />
                  </Button>
                ))}
              </div>
            )}
            <div className='space-y-1'>
              <Label htmlFor='queue_limit_request'>
                Queue Request Limit <span className='text-muted-foreground'>(auto closed)</span>
              </Label>
              <Input id='queue_limit_request' type='text' defaultValue={'10'} />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='user_limit_request'>
                User Limit Request <span className='text-muted-foreground'>(Days)</span>
              </Label>
              <Input id='user_limit_request' type='text' defaultValue={'0'} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='more'>
        <Card>
          <CardHeader>
            <CardTitle>Update Account data</CardTitle>
            <CardDescription>
              This will be update your account data like, profile image, username and modder type.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className='w-full'>Update Your Account Data</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
