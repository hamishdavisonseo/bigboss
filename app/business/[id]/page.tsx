// app/business/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { cache } from '@/lib/cache'
import { getBusinessById, normalizeBusinessData } from '@/utils/dataforseo'
import BusinessMap from '@/components/ui/BusinessMap'
import ReviewSection from '@/components/ui/ReviewSection'
import BusinessHours from '@/components/ui/BusinessHours'
import ContactInfo from '@/components/ui/ContactInfo'
import type { Metadata } from 'next'
import { Business } from '@/types/business'

interface Props {
  params: { id: string }
}

async function getBusinessData(id: string) {
  try {
    const response = await getBusinessById(id)
    if (!response) {
      console.log('No business data found for ID:', id)
      return null
    }
    
    const normalizedData = normalizeBusinessData(response)
    if (!normalizedData) {
      console.log('Failed to normalize business data for ID:', id)
      return null
    }

    return normalizedData
  } catch (error) {
    console.error('Failed to fetch business data:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = await getBusinessData(params.id)
  if (!business) return {}

  return {
    title: `${business.title} | Tech Hub Ireland`,
    description: business.description || `Find information, reviews, and contact details for ${business.title}`,
  }
}

export default async function BusinessPage({ params }: Props) {
  console.log('Params:', params); // Log the entire params object
  const businessId = params.id; // Ensure this is correctly set
  const business = await getBusinessData(businessId);

  if (!business) {
    notFound();
  }

  console.log('Business ID:', businessId); // Log the ID to check its value

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{business.title}</h1>
            {business.category && (
              <p className="mt-2 text-gray-600">{business.category}</p>
            )}
          </div>

          {business.main_image && (
            <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src={business.main_image}
                alt={business.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {business.description && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">{business.description}</p>
            </div>
          )}

          {business.work_hours && (
            <BusinessHours hours={{ ...business.work_hours, current_status: business.work_hours.current_status as "open" | "closed" }} />
          )}
        </div>

        {/* Right Column */}
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

{Array.isArray(business.reviews) && business.reviews.length > 0 && (
  <div className="mt-6">
    <ReviewSection business={business as unknown as Business} reviews={business.reviews} />
  </div>
)}
        </div>
      </div>
    </div>
  )
}