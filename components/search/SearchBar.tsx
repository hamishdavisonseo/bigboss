// components/search/SearchBar.tsx
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Ireland')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for services..."
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location..."
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {isPending ? (
            <span className="animate-spin">⌛</span>
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>
    </form>
  )
}