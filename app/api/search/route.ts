// src/app/api/search/route.ts
import { NextResponse } from 'next/server'
import { searchBusinesses, normalizeBusinessData } from '@/utils/dataforseo'
import { cache } from '@/lib/cache'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const location = url.searchParams.get('location');
    
    if (!query || !location) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Create cache key
    const cacheKey = `search:${query}:${location}`
    
    // Try to get from cache first
    const cachedResults = await cache.get(cacheKey)
    if (cachedResults) {
      return NextResponse.json(cachedResults)
    }

    // If not in cache, fetch from API
    const searchParams = {
      keyword: `${query} ${location}`,
      location_code: 2372, // Ireland
      language_code: 'en',
      depth: 10
    }

    const results = await searchBusinesses(searchParams)
    const normalizedResults = results.map(normalizeBusinessData)

    // Cache the results
    await cache.set(cacheKey, normalizedResults)

    return NextResponse.json(normalizedResults)
  } catch (error: unknown) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: 'Failed to search businesses' },
      { status: 500 }
    )
  }
}