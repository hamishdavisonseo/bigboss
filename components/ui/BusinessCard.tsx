// components/ui/BusinessCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader } from './Card'

interface BusinessCardProps {
  business: {
    id: string
    title: string
    category: string
    rating: {
      value: number
      votes_count: number
    }
    address: string
    phone?: string
    main_image?: string
    snippet?: string
  }
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={business.main_image || '/images/placeholder-business.jpg'}
            alt={business.title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
              {business.title}
          </h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {business.rating.value} ({business.rating.votes_count})
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3">{business.category}</p>

        {business.snippet && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{business.snippet}</p>
        )}

        <div className="space-y-2">
          {business.address && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="line-clamp-1">{business.address}</span>
            </div>
          )}
          
          {business.phone && (
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}