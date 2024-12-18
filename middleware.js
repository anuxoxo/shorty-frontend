import { ACCESS_TOKEN } from "@/utils/constants";
import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get(ACCESS_TOKEN);

  const isLoginOrRegister =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // If the user is already logged in and trying to access login or register routes, redirect to the dashboard
  if (cookie && isLoginOrRegister) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not logged in and trying to access a protected route, redirect to login
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");
  if (!cookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/login", "/register", "/dashboard"], 
};
