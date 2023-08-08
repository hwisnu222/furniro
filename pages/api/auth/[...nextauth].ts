import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials: any) {
        // TODO: create logic login
        // return credential user public
        return {};
      },
    }),
  ],
});
