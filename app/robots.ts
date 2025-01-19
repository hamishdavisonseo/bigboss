
// src/app/robots.ts
export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/admin/'],
        },
      ],
      sitemap: 'https://tech-hub-ireland.com/sitemap.xml',
    }
  }