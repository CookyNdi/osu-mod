import { FaPlus } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import AddRulesForm from './add-rules-form';
import { Rules } from '@prisma/client';
import ListRules from '@/components/list-rules';
import RequestInformation from './request-information';

type RulesContentProps = {
  rules: Rules[];
};

export default function RulesContent({ rules }: RulesContentProps) {
  const requestInformations = rules.filter((rule) => rule.type === 'REQUEST_INFORMATION');
  const genres = rules.filter((rule) => rule.type === 'GENRE');
  const languages = rules.filter((rule) => rule.type === 'LANGUAGE');
  const maps = rules.filter((rule) => rule.type === 'MAP');
  const mappers = rules.filter((rule) => rule.type === 'MAPPER');
  const songDetails = rules.filter((rule) => rule.type === 'SONG_DETAILS');

  return (
    <div className='w-full lg:w-[80%] bg-muted/20 p-4 flex flex-col gap-y-4 rounded-md'>
      <RequestInformation rules={requestInformations.length < 1 ? null : requestInformations[0]} />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <div className='flex justify-between'>
            <h1 className='font-semibold'>Genre Preferences</h1>
            <AddRulesForm rulesType='GENRE'>
              <Button size='sm'>
                <FaPlus />
              </Button>
            </AddRulesForm>
          </div>
          {genres.length < 1 ? (
            <p className='text-muted-foreground text-sm'>None</p>
          ) : (
            <>
              {genres.map((data) => (
                <ListRules rules={data} key={data.id} isEditable />
              ))}
            </>
          )}
        </div>
        <div className='col-span-1'>
          <div className='flex justify-between'>
            <h1 className='font-semibold'>Language Preferences</h1>
            <AddRulesForm rulesType='LANGUAGE'>
              <Button size='sm'>
                <FaPlus />
              </Button>
            </AddRulesForm>
          </div>
          {languages.length < 1 ? (
            <p className='text-muted-foreground text-sm'>None</p>
          ) : (
            <>
              {languages.map((data) => (
                <ListRules rules={data} key={data.id} isEditable />
              ))}
            </>
          )}
        </div>
        <div className='col-span-1'>
          <div className='flex justify-between'>
            <h1 className='font-semibold'>Map Preferences</h1>
            <AddRulesForm rulesType='MAP'>
              <Button size='sm'>
                <FaPlus />
              </Button>
            </AddRulesForm>
          </div>
          {maps.length < 1 ? (
            <p className='text-muted-foreground text-sm'>None</p>
          ) : (
            <>
              {maps.map((data) => (
                <ListRules rules={data} key={data.id} isEditable />
              ))}
            </>
          )}
        </div>
        <div className='col-span-1'>
          <div className='flex justify-between'>
            <h1 className='font-semibold'>Mappers Preferences</h1>
            <AddRulesForm rulesType='MAPPER'>
              <Button size='sm'>
                <FaPlus />
              </Button>
            </AddRulesForm>
          </div>
          {mappers.length < 1 ? (
            <p className='text-muted-foreground text-sm'>None</p>
          ) : (
            <>
              {mappers.map((data) => (
                <ListRules rules={data} key={data.id} isEditable />
              ))}
            </>
          )}
        </div>
        <div className='col-span-1'>
          <div className='flex justify-between'>
            <h1 className='font-semibold'>Song Details Preferences</h1>
            <AddRulesForm rulesType='SONG_DETAILS'>
              <Button size='sm'>
                <FaPlus />
              </Button>
            </AddRulesForm>
          </div>
          {songDetails.length < 1 ? (
            <p className='text-muted-foreground text-sm'>None</p>
          ) : (
            <>
              {songDetails.map((data) => (
                <ListRules rules={data} key={data.id} isEditable />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
