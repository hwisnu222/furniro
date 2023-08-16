import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    // user: {
    //   role?: string | number;
    //   token?: string;
    // };
    user: {
      id: number;
      role?: string;
      token?: string;
      username?: string;
    };
  }
  interface JWT {
    role: string;
    token: string;
    username?: string;
  }

  interface User extends DefaultUser {
    id?: number;
    role?: string;
    token?: string;
  }
}
