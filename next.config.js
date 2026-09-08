/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Generated text endpoints stay cacheable at the edge.
        source: '/llms.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' }],
      },
      {
        source: '/textures/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
