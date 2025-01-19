// app/business/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { cache } from '@/lib/cache'
import { normalizeBusinessData } from '@/utils/dataforseo'
import { getBusinessById } from '@/utils/dataforseo'
import type { Business } from '@/types/business'
import { Metadata } from 'next'
import BusinessMap from '@/components/ui/BusinessMap'
import ReviewSection from '@/components/ui/ReviewSection'
import BusinessHours from '@/components/ui/BusinessHours'
import ContactInfo from '@/components/ui/ContactInfo'

interface Props {
  params: { id: string }
}

async function getBusinessData(id: string): Promise<Business | null> {
  const cacheKey = `business:${id}`.toLowerCase()
  
  try {
    console.log('Checking business cache for:', cacheKey)
    const cachedData = await cache.get(cacheKey)
    
    if (cachedData) {
      console.log('Cache HIT for business:', id)
      return cachedData as Business
    }

    console.log('Cache MISS for business:', id)
    const result = await getBusinessById(id)
    
    if (result) {
      const normalizedBusiness = normalizeBusinessData(result)
      await cache.set(cacheKey, normalizedBusiness, 180) // Cache for 180 days
      return normalizedBusiness
    }
    
    return null
  } catch (error) {
    console.error('Error fetching business:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = await getBusinessData(params.id)
  if (!business) return {}

  const title = `${business.title} Reviews & Information | Tech Hub Ireland`
  const description = business.snippet || 
    `View contact details, reviews, and information for ${business.title} in ${business.address}. Rated ${business.rating.value}/5 from ${business.rating.votes_count} reviews.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website', // Changed from 'business.business' to 'website'
    },
    alternates: {
      canonical: `/business/${params.id}`
    }
  }
}

export default async function BusinessPage({ params }: Props) {
  const business = await getBusinessData(params.id)
  
  if (!business) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{business.title}</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={business.main_image || '/images/placeholder-business.jpg'}
              alt={business.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600">{business.snippet}</p>
              </div>
              
              {business.work_hours && (
                <BusinessHours hours={business.work_hours} />
              )}
            </div>
          </div>
        </div>

        <div>
          <ContactInfo
            phone={business.phone}
            address={business.address}
            website={business.url}
          />
          
          {business.latitude && business.longitude && (
            <div className="mt-6">
              <BusinessMap
                lat={business.latitude}
                lng={business.longitude}
                name={business.title}
              />
            </div>
          )}
          
          <div className="mt-6">
            <ReviewSection business={business} reviews={[]} />
          </div>
        </div>
      </div>
    </div>
  )
}