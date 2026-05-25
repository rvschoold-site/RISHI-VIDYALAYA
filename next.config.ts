import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rishividalaya.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  /* 
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
  */
};

export default nextConfig;
