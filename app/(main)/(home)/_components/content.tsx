import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomeContents() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='truncate'>Sayumana</CardTitle>
            <p>Open</p>
          </div>
          <CardDescription>last seen 1 minutes ago</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-end'>
          <Button>Queue</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='truncate'>SupaV</CardTitle>
            <p>Open</p>
          </div>
          <CardDescription>last seen 1 minutes ago</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-end'>
          <Button>Queue</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='truncate'>KennethBBG</CardTitle>
            <p>Open</p>
          </div>
          <CardDescription>last seen 1 minutes ago</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-end'>
          <Button>Queue</Button>
        </CardContent>
      </Card>
    </div>
  );
}
