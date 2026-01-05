import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/feed", "/create", "/profile"];
const authRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("auth_token")?.value;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(pathname);

  // Not logged in & trying to access protected route
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in & trying to access login/signup
  if (token && isAuthRoute) {
    const feedUrl = new URL("/feed", req.url);
    return NextResponse.redirect(feedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/create",
    "/profile/:path*",
    "/profile/:userId",
    "/login",
    "/signup",
  ],
};
