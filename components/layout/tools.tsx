'use client';
import { FaGithub } from 'react-icons/fa6';
import { MdReportProblem } from 'react-icons/md';
import MyTooltip from '../ui/my-tooltip';

export default function ToolsNav() {
  return (
    <div className='flex gap-x-4 items-center '>
      <MyTooltip message='Source Code'>
        <div className='cursor-pointer' onClick={() => window.open('https://github.com/CookyNdi/osu-mod')}>
          <FaGithub size={20} />
        </div>
      </MyTooltip>
      <MyTooltip message='Report Problem'>
        <div className='cursor-pointer' onClick={() => window.open('https://github.com/CookyNdi/osu-mod/issues')}>
          <MdReportProblem size={20} />
        </div>
      </MyTooltip>
    </div>
  );
}
