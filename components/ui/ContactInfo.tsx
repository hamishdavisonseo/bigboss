// components/ui/ContactInfo.tsx
'use client'

import { Phone, MapPin, Globe } from 'lucide-react'

interface ContactInfoProps {
  phone?: string
  address?: string
  website?: string
}

export default function ContactInfo({ phone, address, website }: ContactInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
      
      <div className="space-y-4">
        {phone && (
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <a
                href={`tel:${phone}`}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {phone}
              </a>
            </div>
          </div>
        )}

        {address && (
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary-600 mt-1 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Address</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-primary-600"
              >
                {address}
              </a>
            </div>
          </div>
        )}

        {website && (
          <div className="flex items-start">
            <Globe className="h-5 w-5 text-primary-600 mt-1 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Website</p>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Visit website
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}