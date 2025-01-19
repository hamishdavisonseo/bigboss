// utils/categoryUtils.ts
import { categories } from '@/data/categories'

export function generateCategoryMetaTitle(category: string, location?: string): string {
  const base = `${category} Services`
  if (location && location !== 'Ireland') {
    return `${base} in ${location} | Tech Hub Ireland`
  }
  return `${base} in Ireland | Tech Hub Ireland`
}

export function generateCategoryMetaDescription(category: string, location?: string): string {
  const area = location && location !== 'Ireland' ? location : 'Ireland'
  return `Find trusted ${category.toLowerCase()} service providers in ${area}. Compare local experts, read customer reviews, and get quotes for your ${category.toLowerCase()} needs.`
}

export function generateStaticLocationPaths() {
  const mainLocations = [
    'Dublin', 'Cork', 'Galway', 'Limerick', 
    'Waterford', 'Belfast', 'Derry'
  ]
  return mainLocations
}

export function generateStaticCategoryPaths() {
  return categories.flatMap(category => {
    const locations = generateStaticLocationPaths()
    return locations.map(location => ({
      category: category.slug,
      location: location.toLowerCase()
    }))
  })
}