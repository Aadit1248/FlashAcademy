import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/',
  /* config options here */
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default withPayload(nextConfig);
