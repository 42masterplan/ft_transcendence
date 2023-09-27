/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/old-blog/:path',
        destination: '/new-sexy-blog/:path',
        permanent: false
      }
    ];
  },
};

module.exports = nextConfig;
