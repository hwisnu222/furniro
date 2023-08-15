import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/graphql/client";
import { LOGIN } from "@/graphql/mutations/authentication.mutation";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials: any) {
        // TODO: create logic login
        const { data } = await client.query({
          query: LOGIN,
          variables: {
            identifier: credentials.username,
            password: credentials.password,
          },
        });
        console.log(data);

        if (!data) {
          return null;
        }

        const login = data.login;
        return {
          id: login.user.id,
          username: login.user.username,
          email: login.user.email,
          token: login.jwt,
        };
      },
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
    }),
  ],
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ user, token }: { user: User; token: JWT }) => {
      if (user) {
        return Promise.resolve(user);
      }
      return Promise.resolve(token);
    },
    session: async ({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }) => {
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "",
    newUser: "",
  },
  debug: true,
});
