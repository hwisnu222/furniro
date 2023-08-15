import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ROLE } from "./constants";
import { signOut } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;
  // if url in path user
  if (pathname.startsWith("/user") && session?.role === ROLE.Authenticated) {
    return NextResponse.next();
  }

  // if url in path admin
  if (pathname.startsWith("/admin") && session?.role === ROLE.Admin) {
    return NextResponse.next();
  }

  // if pathname does't match and have session redirect user to logout
  // or forbidden
  if (session) {
    signOut({
      callbackUrl: "/auth/login",
    });
  }

  //  if user not have session redirect to login
  return NextResponse.redirect(new URL("/auth/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
