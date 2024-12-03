import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Webpack: Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs');
    }
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        // Turbopack: Ensure that all imports of 'yjs' resolve to the same instance
        yjs: path.resolve(__dirname, 'node_modules/yjs'),
      },
    },
  },
};

export default nextConfig;
