
// src/app/sitemap.ts
import { categories } from '@/data/categories'

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
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
  ]
}