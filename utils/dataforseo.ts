// utils/dataforseo.ts
import axios from 'axios'
import { cache } from '@/lib/cache'

const DATAFORSEO_BASE_URL = 'https://api.dataforseo.com/v3'
const AUTH_TOKEN = process.env.DATAFORSEO_API_KEY

interface BusinessSearchParams {
  keyword: string
  location_code: number
  language_code: string
  depth?: number
}

// For index/listing pages using Maps API
export async function searchBusinesses(params: BusinessSearchParams) {
  const cacheKey = `search:${params.keyword}:${params.location_code}`.toLowerCase()

  try {
    // Check cache first
    console.log('Checking cache for search:', cacheKey)
    const cachedData = await cache.get(cacheKey)
    if (cachedData) {
      console.log('Cache HIT for search:', params.keyword)
      return cachedData
    }

    console.log('Cache MISS for search:', params.keyword)

    // Make API request
    const response = await axios.post(
      `${DATAFORSEO_BASE_URL}/serp/google/maps/live/advanced`,
      [params],
      {
        headers: {
          'Authorization': `Basic ${AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data?.tasks?.[0]?.result?.[0]?.items) {
      const businesses = response.data.tasks[0].result[0].items.map(normalizeSearchData)
      await cache.set(cacheKey, businesses, 180) // Cache for 180 days
      return businesses
    }
    
    return []
  } catch (error) {
    console.error('DataForSEO Maps API Error:', error)
    throw new Error('Failed to fetch business listings')
  }
}

// For individual business pages using Business Info API
export async function getBusinessById(id: string) {
  const cacheKey = `business:${id.toLowerCase()}`

  try {
    // Check cache first
    console.log('Checking cache for business:', cacheKey)
    const cachedData = await cache.get(cacheKey)
    if (cachedData) {
      console.log('Cache HIT for business:', id)
      return cachedData
    }

    console.log('Cache MISS for business:', id)

    // Make API request to Business Info endpoint
    const response = await axios.post(
      `${DATAFORSEO_BASE_URL}/business_data/google/my_business_info/live`,
      [{
        keyword: `cid:${id}`,
        location_code: 2372,
        language_code: 'en'
      }],
      {
        headers: {
          'Authorization': `Basic ${AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data?.tasks?.[0]?.result?.[0]?.items?.[0]) {
      const businessData = normalizeBusinessData(response.data.tasks[0].result[0].items[0])
      if (businessData) {
        await cache.set(cacheKey, businessData, 180)
        return businessData
      }
    }
    
    return null
  } catch (error) {
    console.error('DataForSEO Business Info API Error:', error)
    return null
  }
}

// Normalize data for search results (minimal data needed for listings)
export function normalizeSearchData(rawData: any) {
  return {
    id: rawData.place_id || rawData.cid,
    title: rawData.title,
    category: rawData.category,
    rating: {
      value: rawData.rating?.value || 0,
      votes_count: rawData.rating?.votes_count || 0
    },
    address: rawData.address,
    snippet: rawData.snippet,
    main_image: rawData.main_image
  }
}

// Normalize data for individual business pages (full detailed data)
export function normalizeBusinessData(rawData: any) {
  if (!rawData) return null

  return {
    id: rawData.place_id || rawData.cid,
    title: rawData.title,
    url: rawData.url,
    category: rawData.category,
    rating: {
      value: rawData.rating?.value || 0,
      votes_count: rawData.rating?.votes_count || 0
    },
    address: rawData.address,
    phone: rawData.phone,
    main_image: rawData.main_image,
    description: rawData.description,
    latitude: rawData.latitude,
    longitude: rawData.longitude,
    work_hours: rawData.work_time?.work_hours || null,
    additional_categories: rawData.additional_categories || [],
    logo: rawData.logo,
    total_photos: rawData.total_photos,
    rating_distribution: rawData.rating_distribution,
    attributes: rawData.attributes,
    people_also_search: rawData.people_also_search,
    place_topics: rawData.place_topics,
    reviews: rawData.reviews || []
  }
}