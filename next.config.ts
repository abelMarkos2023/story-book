import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export const config = {
  matcher: [
    "/auth/login",
    "/auth/register",
    "/dashboard/:path*",
  ],
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
