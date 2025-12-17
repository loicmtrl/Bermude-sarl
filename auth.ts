import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/db/prisma';
import { compare } from './lib/encrypt';
import { cookies } from 'next/headers';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
  credentials: {
    email: { type: 'email' },
    password: { type: 'password' },
  },
  async authorize(credentials, _request) {
    if (!credentials?.email || !credentials.password) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user || !user.password) {
      return null;
    }

    const isMatch = await compare(
      credentials.password,
      user.password
    );

    if (!isMatch) {
      return null;
    }

    // ⚠️ RETOURNER UN USER COMPLET
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
}),
  ],

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;

        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, name: true },
        });

        token.role = dbUser?.role;
        token.name = dbUser?.name ?? token.name;

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookieStore = cookies();
          const sessionCartId = cookieStore.get('sessionCartId')?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessionCart) {
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }

      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.name = token.name as string;
      return session;
    },
  },
});
