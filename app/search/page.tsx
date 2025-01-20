// app/search/page.tsx
import { cache } from '@/lib/cache'
import { searchBusinesses, normalizeBusinessData } from '@/utils/dataforseo'
import BusinessGrid from '@/components/ui/BusinessGrid'
import SearchFilters from '@/components/search/SearchFilters'
import SearchBar from '@/components/search/SearchBar'

interface SearchPageProps {
  searchParams: {
    q?: string
    location?: string
    category?: string
    rating?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams?.q || ''
  const location = searchParams?.location || 'Ireland'
  const category = searchParams?.category
  const rating = searchParams?.rating
  
  const cacheKey = `search:${q}:${location}:${category}:${rating}`
  
  let results = []
  
  if (q) {
    try {
      const cachedResults = await cache.get(cacheKey)
      if (Array.isArray(cachedResults) && cachedResults.length > 0) {
        results = cachedResults
      } else {
        const searchResponse = await searchBusinesses({
          keyword: `${q} ${location}`,
          location_code: 2372,
          language_code: 'en',
          depth: 6
        })
        
        results = searchResponse.map(normalizeBusinessData)
        if (category) {
          results = results.filter(business => business && business.category === category)
        }
        
        if (rating) {
          results = results.filter(business => business && business.rating && business.rating.value >= Number(rating))
        }
        
        await cache.set(cacheKey, results)
      }
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <SearchBar />
      </div>
      
      {q && (
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Search Results for {q} in {location}
        </h1>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchFilters />
        </aside>
        
        <main className="lg:col-span-3">
          <BusinessGrid businesses={results as never[]} />
        </main>
      </div>
    </div>
  )
}