import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthCard() {
  return (
    <Card className='w-[315px]'> 
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className='w-full'>Login</Button>
      </CardContent>
    </Card>
  );
}
