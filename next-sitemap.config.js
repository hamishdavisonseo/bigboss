// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tech-hub-ireland.com',
  generateRobotsTxt: true,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin']
      }
    ]
  },
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // Custom transformation for dynamic routes
    if (path.includes('/business/') || 
        path.includes('/categories/') ||
        path.match(/^\/[^/]+\/[^/]+\/[^/]+$/)) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString()
      }
    }
    
    // Homepage
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString()
      }
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date().toISOString()
    }
  }
}

// app/sitemap.ts
import { categories, counties } from '@/data/categories'
import { cache } from '@/lib/cache'

export default async function sitemap() {
  const baseUrl = 'https://tech-hub-ireland.com'

  // Get cached businesses
  let businesses = []
  try {
    const cachedBusinesses = await cache.get('all_businesses')
    if (cachedBusinesses) {
      businesses = cachedBusinesses
    }
  } catch (error) {
    console.error('Error fetching cached businesses:', error)
  }

  // Generate category URLs
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Generate subcategory URLs
  const subcategoryUrls = categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      url: `${baseUrl}/categories/${category.slug}/${subcategory.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  )

  // Generate location-based URLs
  const locationUrls = counties.flatMap((county) =>
    categories.flatMap((category) =>
      category.subcategories.map((subcategory) => ({
        url: `${baseUrl}/${county.toLowerCase()}/${category.slug}/${subcategory.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }))
    )
  )

  // Generate business URLs
  const businessUrls = businesses.map((business) => ({
    url: `${baseUrl}/business/${business.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    ...subcategoryUrls,
    ...locationUrls,
    ...businessUrls,
  ]
}