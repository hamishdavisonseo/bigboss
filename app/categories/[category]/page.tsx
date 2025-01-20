// app/categories/[category]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/data/categories'
import type { Metadata } from 'next'

interface Props {
  params: { 
    category: string; 
    location: string; // Add location if needed
    subcategory: string; // Add subcategory if needed
  };
  searchParams: { [key: string]: string | string[] }; // Add this line
}

// app/[location]/[category]/[subcategory]/page.tsx
// Add this to your existing page file:

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { location, category, subcategory } = params
  const categoryData = categories.find(c => c.slug === category)
  const subcategoryData = categoryData?.subcategories.find(s => s.slug === subcategory)
  
  if (!subcategoryData) return {}

  const locationFormatted = location.charAt(0).toUpperCase() + location.slice(1)
  const currentLocation = searchParams?.location || locationFormatted
  
  const title = `${subcategoryData.name} in ${currentLocation}, Ireland | Find Local Providers`
  const description = `Find trusted ${subcategoryData.name.toLowerCase()} providers in ${currentLocation}. Compare services, read reviews, and get quotes from local experts.`

  return {
    title,
    description,
    alternates: {
      canonical: `/${location}/${category}/${subcategory}${searchParams?.location ? `?location=${searchParams.location}` : ''}`
    },
    openGraph: {
      title,
      description,
      url: `/${location}/${category}/${subcategory}${searchParams?.location ? `?location=${searchParams.location}` : ''}`,
      locale: 'en_IE',
      type: 'website'
    }
  }
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({ 
  params: { category } 
}: Props) {
  const categoryData = categories.find(c => c.slug === category)
  
  if (!categoryData) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {categoryData.name} Services
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {categoryData.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryData.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${category}/${subcategory.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {subcategory.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {subcategory.description}
              </p>
              <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700">
                <span className="text-sm font-medium">View providers Now</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}