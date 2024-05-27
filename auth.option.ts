import type { NextAuthOptions } from 'next-auth';
import OsuProvider from 'next-auth/providers/osu';

export const options = {
  providers: [
    OsuProvider({
      clientId: process.env.OSU_CLIENT_ID as string,
      clientSecret: process.env.OSU_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
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
