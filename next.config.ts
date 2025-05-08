import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@headlessui/react'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://65c21c4ff7e6ea59682aa7e1.mockapi.io/api/v1/:path*',
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
