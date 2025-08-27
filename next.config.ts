import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'krsirixpvktoebrskpbc.supabase.co',
      },
       {
  protocol: 'https',
  hostname: 'img.clerk.com',
 },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', 
    },
  },
};

export default nextConfig;
