// app/[location]/[category]/[subcategory]/page.tsx
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

// Define the SegmentParams interface
export interface SegmentParams {
    location: string;
    category: string;
    subcategory: string;
  }
  
  export interface PageProps {
    params: SegmentParams; // Ensure it's required
    searchParams?: Record<string, string | undefined>;
  }


async function getBusinessData(subcategoryName: string, location: string): Promise<Business[]> {
  const cacheKey = `businesses:${subcategoryName}:${location}`.toLowerCase()
  
  try {
    console.log('Checking cache for:', cacheKey)
    const cachedData = await cache.get(cacheKey)
    
    if (cachedData) {
      console.log('Cache HIT for:', cacheKey)
      return cachedData as Business[]
    }

    console.log('Cache MISS for:', cacheKey)
    const results = await searchBusinesses({
      keyword: `${subcategoryName} ${location} ireland`,
      location_code: 2372,
      language_code: 'en',
      depth: 6
    })

    const normalizedResults = results.map(normalizeBusinessData)
    await cache.set(cacheKey, normalizedResults, 180) // Cache for 180 days
    return normalizedResults
  } catch (error) {
    console.error('Error fetching business data:', error)
    return []
  }
}

export async function generateMetadata(
    { params }: { params: SegmentParams }
  ): Promise<Metadata> {
  const { location, category, subcategory } = params
  const categoryData = categories.find(c => c.slug === category)
  const subcategoryData = categoryData?.subcategories.find(s => s.slug === subcategory)
  
  if (!subcategoryData) return {}

  const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1)
  
  return {
    title: `${subcategoryData.name} in ${locationFormatted}, Ireland | Find Local Providers`,
    description: `Find trusted ${subcategoryData.name.toLowerCase()} providers in ${locationFormatted}. Compare services, read reviews, and get quotes from local experts.`,
    alternates: {
      canonical: `/${location}/${category}/${subcategory}`
    }
  }
}

export default async function LocationCategoryPage({ params }: { params: SegmentParams }) {
    const { location, category, subcategory } = params;
  
    // Validate the category and subcategory exist
    const categoryData = categories.find(c => c.slug === category);
    const subcategoryData = categoryData?.subcategories.find(s => s.slug === subcategory);
  
    if (!categoryData || !subcategoryData) {
      notFound();
    }

  const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1)
  const businesses = await getBusinessData(subcategoryData.name, locationFormatted)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {subcategoryData.name} in {locationFormatted}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find trusted {subcategoryData.name.toLowerCase()} providers in {locationFormatted}. 
          Compare services, read reviews, and connect with local experts.
        </p>
      </div>

      <div className="mb-8">
        <LocationFilter currentLocation={locationFormatted} />
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        {businesses.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Top {subcategoryData.name} Providers in {locationFormatted}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">
              No providers found in {locationFormatted} for this service.
            </p>
            <p className="text-gray-600">
              Try searching in nearby areas or contact us to recommend a provider.
            </p>
          </div>
        )}
      </Suspense>

      {/* SEO Content Section */}
      <div className="mt-16 prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">
          {subcategoryData.name} Services in {locationFormatted}
        </h2>
        <p className="mb-4">
          Looking for professional {subcategoryData.name.toLowerCase()} services in {locationFormatted}? 
          Our directory features verified local providers with detailed reviews and ratings to help you 
          make an informed decision.
        </p>
        <h3 className="text-xl font-semibold mb-3">
          Why Choose Local {subcategoryData.name} Providers?
        </h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Local expertise and knowledge of {locationFormatted} regulations</li>
          <li>Faster response times and emergency services</li>
          <li>Face-to-face consultations and personalized service</li>
          <li>Supporting local businesses in {locationFormatted}</li>
        </ul>
      </div>
    </div>
  )
}