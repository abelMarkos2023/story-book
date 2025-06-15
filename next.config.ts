import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS URL
      },
      {
        protocol: 'http',
        hostname: '**', // Optional: allow HTTP (less secure)
      },
    ],
  },
};

export default nextConfig;