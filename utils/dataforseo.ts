// utils/dataforseo.ts
import axios from 'axios'

export interface BusinessSearchParams {
  keyword: string
  location_code: number
  language_code: string
  depth?: number
}

export async function searchBusinesses(params: BusinessSearchParams) {
  const DATAFORSEO_BASE_URL = 'https://api.dataforseo.com/v3'
  const AUTH_TOKEN = process.env.DATAFORSEO_API_KEY

  try {
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
      return response.data.tasks[0].result[0].items
    }
    
    return []
  } catch (error) {
    console.error('DataForSEO API Error:', error)
    throw new Error('Failed to fetch business data')
  }
}

export function normalizeBusinessData(rawData: any) {
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
    snippet: rawData.snippet,
    latitude: rawData.latitude,
    longitude: rawData.longitude
  }
}

export const getBusinessById = async (id: string) => {
  const DATAFORSEO_BASE_URL = 'https://api.dataforseo.com/v3'
  const AUTH_TOKEN = process.env.DATAFORSEO_API_KEY

  try {
    const response = await axios.get(
      `${DATAFORSEO_BASE_URL}/business/${id}`, // Adjust the endpoint as necessary
      {
        headers: {
          'Authorization': `Basic ${AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data?.result) {
      return normalizeBusinessData(response.data.result)
    }
    
    return null
  } catch (error) {
    console.error('DataForSEO API Error:', error)
    throw new Error('Failed to fetch business data by ID')
  }
}