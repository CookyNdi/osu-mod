import { STATUS } from '@prisma/client';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdOutlineStickyNote2, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';

type StatusListIconProps = {
  status: STATUS;
};

export default function StatusListIcon({ status }: StatusListIconProps) {
  switch (status) {
    case 'ACCEPTED':
      return <FaRegCheckCircle size={20} />;
    case 'REJECTED':
      return <IoMdCloseCircleOutline size={24} />;
    case 'MODDED':
      return <MdOutlineStickyNote2 size={20} />;
    case 'NOMINATED':
      return <AiFillLike size={20} />;
    case 'RANKED':
      return <MdOutlineKeyboardDoubleArrowUp size={20} />;
    default:
      return <FaClockRotateLeft size={20} />;
  }
}
