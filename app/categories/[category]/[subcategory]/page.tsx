// app/categories/[category]/[subcategory]/page.tsx
import { notFound } from 'next/navigation'
import { cache } from '@/lib/cache'
import { searchBusinesses, normalizeBusinessData } from '@/utils/dataforseo'
import { categories } from '@/data/categories'
import BusinessCard from '@/components/ui/BusinessCard'
import LocationFilter from '@/components/ui/LocationFilter'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import type { Business } from '@/types/business'

// Add this prop type to both page components:
interface Props {
  params: {
    location?: string
    category: string
    subcategory: string
  }
  searchParams?: { [key: string]: string | undefined }
}

async function getBusinessData(subcategoryName: string, location: string): Promise<Business[]> {
  const cacheKey = `businesses:${subcategoryName}:${location}`.toLowerCase()
  
  try {
    const cachedData = await cache.get(cacheKey)
    if (cachedData) return cachedData as Business[]

    const results = await searchBusinesses({
      keyword: `${subcategoryName} ${location}`,
      location_code: 2372,
      language_code: 'en',
      depth: 6
    })

    const normalizedResults = results.map(normalizeBusinessData)
    await cache.set(cacheKey, normalizedResults)
    return normalizedResults as Business[]
  } catch (error) {
    console.error('Error fetching business data:', error)
    return []
  }
}

// app/[location]/[category]/[subcategory]/page.tsx
// Add this to your existing page file:
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { category, subcategory } = params
  const location = searchParams?.location || 'Ireland' // Default location if not provided
  const categoryData = categories.find(c => c.slug === category)
  const subcategoryData = categoryData?.subcategories.find(s => s.slug === subcategory)
  
  if (!subcategoryData) return {}

  const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1)
  const currentLocation = searchParams?.location || locationFormatted
  
  const title = `${subcategoryData.name} in ${currentLocation}, Ireland | Find Local Providers`
  const description = `Find trusted ${subcategoryData.name.toLowerCase()} providers in ${currentLocation}. Compare services, read reviews, and get quotes from local experts.`

  return {
    title,
    description,
    alternates: {
      canonical: `/${location}/${category}/${subcategory}${searchParams?.location ? `?location=${searchParams.location}` : ''}`
    },
    openGraph: {
      title,
      description,
      url: `/${location}/${category}/${subcategory}${searchParams?.location ? `?location=${searchParams.location}` : ''}`,
      locale: 'en_IE',
      type: 'website'
    }
  }
}

export function generateStaticParams() {
  return categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.slug,
      subcategory: subcategory.slug,
    }))
  )
}

export default async function SubcategoryPage({ 
  params,
  searchParams 
}: Props) {
  const { category, subcategory } = await params;
  const location = (await searchParams)?.location || 'Ireland';
  
  const categoryData = categories.find(c => c.slug === category)
  const subcategoryData = categoryData?.subcategories.find(s => s.slug === subcategory)
  if (!categoryData || !subcategoryData) {
    notFound()
  }

  const businesses = await getBusinessData(subcategoryData.name, location)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {subcategoryData.name} in {location}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subcategoryData.description}
        </p>
      </div>

      <div className="mb-8">
  <LocationFilter currentLocation={location} />
</div>

      <Suspense fallback={<LoadingSpinner />}>
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business: Business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No providers found in {location}. Try searching in a different location.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  )
}