// components/search/SearchFilters.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleRatingFilter = (rating: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('rating', rating)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingFilter(rating.toString())}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              {rating}+ Stars
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}