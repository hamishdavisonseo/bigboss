/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'cdn.pixabay.com',
        'pixabay.com',
        'lh5.googleusercontent.com',
        'maps.google.com',
        'maps.gstatic.com'
      ],
      unoptimized: true,
    },
    experimental: {
      serverActions: true,
    },
    env: {
      SITE_URL: 'https://tech-hub-ireland.info',
    },
    async redirects() {
      return [
        {
          source: '/index',
          destination: '/',
          permanent: true,
        },
      ]
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ]
    },
  }
  
  module.exports = nextConfig