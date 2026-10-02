import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.alias['@tiptap/core'] = path.resolve(__dirname, 'node_modules/@tiptap/core');

    return config;
  },
};

export default nextConfig;
