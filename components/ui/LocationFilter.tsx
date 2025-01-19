// components/ui/LocationFilter.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { counties } from '@/data/categories'
import { parsePathForNavigation } from '@/utils/navigation'


interface LocationFilterProps {
  currentLocation?: string
}

export default function LocationFilter({ currentLocation = 'Ireland' }: LocationFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLocationChange = (location: string) => {
    const { category, subcategory } = parsePathForNavigation(pathname)
    
    // Safety check
    if (!category || !subcategory) {
      console.error('Missing category or subcategory in path:', pathname)
      return
    }

    const newPath = location === 'Ireland' 
      ? `/categories/${category}/${subcategory}`
      : `/${location.toLowerCase()}/${category}/${subcategory}`

    console.log('Navigating to:', newPath)
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-5 w-5 text-primary-600" />
      <select
        value={currentLocation}
        onChange={(e) => handleLocationChange(e.target.value)}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="Ireland">All Ireland</option>
        {counties.map((county) => (
          <option key={county} value={county}>
            {county}
          </option>
        ))}
      </select>
    </div>
  )
}