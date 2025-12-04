import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  
  transpilePackages: ['sanity', '@sanity/vision'],
  
  // Disable linting during build untuk deploy cepat
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity/block-tools': false,
      'groq-js': false,
    };
    return config;
  },
};

export default nextConfig;