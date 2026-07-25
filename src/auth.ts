import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/db/schema";
import { comparePassword } from "@/lib/password";


export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({

 adapter: DrizzleAdapter(db),

  session: {
  strategy: "jwt",
},

  providers: [

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const result = await db
          .select()
          .from(users)
          .where(
            eq(
              users.email,
              credentials.email as string
            )
          )
          .limit(1);


        const user = result[0];


        if (!user || !user.passwordHash) {
          return null;
        }


        const passwordMatch =
          await comparePassword(
            credentials.password as string,
            user.passwordHash
          );


        if (!passwordMatch) {
          return null;
        }


        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],


 callbacks: {
  async jwt({ token, user }) {

    if (user) {
      token.id = user.id;
    }

    return token;
  },


  async session({ session, token }) {

    if (session.user) {
      session.user.id = token.id as string;
    }

    return session;
  },
},

});