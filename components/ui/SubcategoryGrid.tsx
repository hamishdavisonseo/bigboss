// components/ui/SubcategoryGrid.tsx
'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { type Subcategory } from '@/data/categories'

interface SubcategoryGridProps {
  subcategories: Subcategory[]
  parentSlug: string
}

export default function SubcategoryGrid({ subcategories, parentSlug }: SubcategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.slug}
          href={`/categories/${parentSlug}/${subcategory.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {subcategory.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{subcategory.description}</p>
            <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700">
              <span className="text-sm font-medium">View providers</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}