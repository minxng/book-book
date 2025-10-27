import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicPaths = ["/_next", "/favicon.ico"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value;
  const authPages = ["/login", "/sign-up"];
  if (token && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token) {
    if (authPages.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
