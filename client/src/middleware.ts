// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const privateRouter = ["/user-list"];
const authRouter = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (privateRouter.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authRouter.some((path) => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/loan-list", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
