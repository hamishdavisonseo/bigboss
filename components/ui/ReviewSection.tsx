// components/ui/ReviewSection.tsx
'use client'

import React from 'react';
import type { Business } from '@/types/business';
import { Star } from 'lucide-react'

interface Review {
  author: string
  rating: number
  content: string
  date: string
}

interface ReviewSectionProps {
  business: Business;
  reviews: Review[]
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ business, reviews }) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Customer Reviews for {business.title}</h2>
      
      <div className="mt-4">
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
          </span>
        </div>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {review.author}
                </span>
                <span className="ml-4 text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewSection;