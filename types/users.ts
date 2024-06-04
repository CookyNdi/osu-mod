import { Users } from '@prisma/client';

export type UsersType = Users & {
  Settings: {
    open: boolean;
    modes: string[];
    modder_type: string;
  }[];
};
