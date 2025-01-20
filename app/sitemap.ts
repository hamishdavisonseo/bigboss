// src/app/sitemap.ts
import { categories, counties } from '@/data/categories'
import { cache } from '@/lib/cache'

export default async function sitemap() {
  const baseUrl = 'https://techhubireland.info'
  
  // Generate category and subcategory URLs
  const categoryUrls = categories.flatMap(category => {
    const categoryUrl = {
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
    
    const subcategoryUrls = category.subcategories.map(sub => ({
      url: `${baseUrl}/categories/${category.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
    
    return [categoryUrl, ...subcategoryUrls]
  })

  // Generate location-based URLs
  const locationUrls = counties.flatMap(county =>
    categories.flatMap(category =>
      category.subcategories.map(subcategory => ({
        url: `${baseUrl}/${county.toLowerCase()}/${category.slug}/${subcategory.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }))
    )
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    ...locationUrls,
  ]
}