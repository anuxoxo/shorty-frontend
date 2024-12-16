import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard"],
};
