import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/graphql/client";
import { LOGIN } from "@/graphql/mutations/authentication.mutation";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { API_BASE } from "@/config/api";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials: any) {
        // TODO: create logic login
        try {
          const { data: login } = await API_BASE.post("/auth/local", {
            identifier: credentials.username,
            password: credentials.password,
          });

          if (!login) {
            return null;
          }

          const { data: user } = await API_BASE.get(
            `/users/${login.user.id}?populate=role`,
          );
          console.log({ user });

          return {
            id: login.user.id,
            username: login.user.username,
            email: login.user.email,
            token: login.jwt,
            role: user.role.name,
          };

          return {};
        } catch (error) {
          console.log(error);
          return null;
        }
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
      session = Object.assign(session, token);
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
