
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
      sitemap: 'https://techhubireland.info/sitemap.xml',
    }
  }