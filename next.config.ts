import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@tiptap/core'] = path.resolve(__dirname, 'node_modules/@tiptap/core');

    return config;
  },
};

export default nextConfig;
