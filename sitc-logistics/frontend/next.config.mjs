/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache during development to prevent OneDrive file-locking ENOENT crashes
      config.cache = {
        type: 'memory',
      };
    }
    return config;
  },
};

export default nextConfig;

