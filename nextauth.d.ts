import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: string | number;
      token: string;
    };
  }
  interface JWT {
    role: string | number;
    token: string;
  }

  interface User extends DefaultUser {
    id?: number;
    role?: string;
  }
}
