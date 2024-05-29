import { CatchIcon } from './icon/catch';
import { ManiaIcon } from './icon/mania';
import { OsuIcon } from './icon/osu';
import { TaikoIcon } from './icon/taiko';

type DiffListIconProps = {
  mode: string;
  color: string;
};

export default function DiffListIcon({ mode, color }: DiffListIconProps) {
  switch (mode) {
    case 'mania':
      return <ManiaIcon fill={color} width={20} height={20} />;
    case 'taiko':
      return <TaikoIcon fill={color} width={20} height={20} />;
    case 'fruits':
      return <CatchIcon fill={color} width={20} height={20} />;
    default:
      return <OsuIcon fill={color} width={20} height={20} />;
  }
}
