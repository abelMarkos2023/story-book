// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });

//   const isAuthPage =
//     request.nextUrl.pathname.startsWith("/auth/login") ||
//     request.nextUrl.pathname.startsWith("/auth/register");

//   const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

//   // 🔒 If visiting login/register and already authenticated, redirect to dashboard
//   if (isAuthPage && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // 🔒 If visiting dashboard and not authenticated, redirect to login
//   if (isDashboardPage && !token) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   return NextResponse.next();
// }

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register');
    const isDashboardPage = pathname.startsWith('/dashboard');

    if (isAuthPage && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isDashboardPage && !token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }
}

export const config = {
  matcher: [
    '/auth/login',
    '/auth/register',
    '/dashboard/:path*',
  ],
};