import type { NextAuthOptions } from 'next-auth';
import OsuProvider from 'next-auth/providers/osu';
import { getUserById } from './data/users';
import { createUser } from './actions/user/create';
import { OsuUserDetails } from './types/osu-respone-api';

export const options = {
  providers: [
    OsuProvider({
      clientId: process.env.OSU_CLIENT_ID as string,
      clientSecret: process.env.OSU_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await getUserById(`${user.id}`);
      if (!existingUser) {
        const user = await createUser(profile as OsuUserDetails);
        if (!user) return false;
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: { signIn: '/auth' },
} satisfies NextAuthOptions;
