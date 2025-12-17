import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  eslint: {
    // Ignore les erreurs ESLint pendant le build de production
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;