import { imageHosts } from './image-hosts.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Si tienes otros hosts de imageHosts, puedes integrarlos de forma segura aquí
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/impulsa',
        permanent: false,
      },
      {
        source: '/certify',
        destination: '/impulsa',
        permanent: false,
      },
    ];
  }
};

export default nextConfig;