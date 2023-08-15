import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(session);

  if (session) {
    return NextResponse.next();
  }
  //   return NextResponse.next();
  return NextResponse.redirect(new URL("/auth/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
