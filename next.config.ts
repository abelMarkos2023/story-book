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
};

export default nextConfig;
