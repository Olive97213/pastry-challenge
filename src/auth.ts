import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { users } from "@/db/schema";
import { comparePassword } from "@/lib/password";


export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({

  adapter: DrizzleAdapter(db),


  /**
   * Utilisation des JWT car Credentials
   * ne fonctionne pas avec les sessions database.
   */
  session: {
    strategy: "jwt",
  },


  providers: [

    Credentials({

      credentials: {
        email: {},
        password: {},
      },


      /**
       * Vérification des identifiants utilisateur.
       */
      async authorize(credentials) {


        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }


        const email =
          credentials.email as string;


        const password =
          credentials.password as string;



        const result =
          await db
            .select()
            .from(users)
            .where(
              eq(
                users.email,
                email
              )
            )
            .limit(1);



        const user = result[0];



        if (
          !user ||
          !user.passwordHash
        ) {
          return null;
        }



        const passwordMatch =
          await comparePassword(
            password,
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


    /**
     * Stocke l'identifiant utilisateur
     * dans le JWT.
     */
    async jwt({
      token,
      user,
    }) {

      if (user) {
        token.id = user.id;
      }

      return token;
    },



    /**
     * Ajoute l'id utilisateur
     * dans la session accessible côté app.
     */
    async session({
      session,
      token,
    }) {


      if (session.user) {
        session.user.id =
          token.id as string;
      }


      return session;
    },
  },
});