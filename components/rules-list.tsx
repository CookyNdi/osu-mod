import { Rules } from '@prisma/client';

import ListRules from '@/components/list-rules';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type RulesListProps = {
  children: React.ReactNode;
  rules: Rules[];
};

export default function RulesList({ children, rules }: RulesListProps) {
  const requestInformations = rules.filter((rule) => rule.type === 'REQUEST_INFORMATION');
  const genres = rules.filter((rule) => rule.type === 'GENRE');
  const languages = rules.filter((rule) => rule.type === 'LANGUAGE');
  const maps = rules.filter((rule) => rule.type === 'MAP');
  const mappers = rules.filter((rule) => rule.type === 'MAPPER');
  const songDetails = rules.filter((rule) => rule.type === 'SONG_DETAILS');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:w-[720px] sm:max-h-[480px] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Rules</DialogTitle>
        </DialogHeader>
        <div className='w-full bg-muted/20 p-4 flex flex-col gap-y-4 rounded-md'>
          <div className='w-full flex flex-col gap-y-4'>
            <h1 className='text-lg font-semibold'>Request Information</h1>
            {requestInformations.length < 1 ? (
              <p className='text-muted-foreground text-sm'>None</p>
            ) : (
              <p>{requestInformations[0].message}</p>
            )}
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='col-span-1'>
              <h1 className='font-semibold'>Genre Preferences</h1>
              {genres.length < 1 ? (
                <p className='text-muted-foreground text-sm'>None</p>
              ) : (
                <>
                  {genres.map((data) => (
                    <ListRules rules={data} key={data.id} />
                  ))}
                </>
              )}
            </div>
            <div className='col-span-1'>
              <h1 className='font-semibold'>Language Preferences</h1>
              {languages.length < 1 ? (
                <p className='text-muted-foreground text-sm'>None</p>
              ) : (
                <>
                  {languages.map((data) => (
                    <ListRules rules={data} key={data.id} />
                  ))}
                </>
              )}
            </div>
            <div className='col-span-1'>
              <h1 className='font-semibold'>Map Preferences</h1>
              {maps.length < 1 ? (
                <p className='text-muted-foreground text-sm'>None</p>
              ) : (
                <>
                  {maps.map((data) => (
                    <ListRules rules={data} key={data.id} />
                  ))}
                </>
              )}
            </div>
            <div className='col-span-1'>
              <h1 className='font-semibold'>Mappers Preferences</h1>
              {mappers.length < 1 ? (
                <p className='text-muted-foreground text-sm'>None</p>
              ) : (
                <>
                  {mappers.map((data) => (
                    <ListRules rules={data} key={data.id} />
                  ))}
                </>
              )}
            </div>
            <div className='col-span-1'>
              <h1 className='font-semibold'>Song Details Preferences</h1>
              {songDetails.length < 1 ? (
                <p className='text-muted-foreground text-sm'>None</p>
              ) : (
                <>
                  {songDetails.map((data) => (
                    <ListRules rules={data} key={data.id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
