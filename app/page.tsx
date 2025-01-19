// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Search, Star, Shield } from 'lucide-react'
import SearchBar from '@/components/search/SearchBar'
import { categories } from '@/data/categories'


async function getTopBusinesses() {
  // This would normally fetch from your API/cache
  // For now returning static data
  return [
    {
      id: '1',
      title: 'Solar Generation',
      category: 'Solar PV Installation',
      rating: 4.9,
      reviews: 86,
      location: 'Dublin',
      image: '/images/placeholder-business.jpg'
    },
    // Add more businesses...
  ]
}

export default async function Home() {
  const topBusinesses = await getTopBusinesses()

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                Find Tech Services Across Ireland
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Connect with trusted technology service providers. From solar installations to smart home solutions, find expert help for your needs.
              </p>
              <div className="mt-10">
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <Image
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src="/images/hero-image.jpg"
              alt="Tech services"
              width={1000}
              height={800}
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Browse by Category
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Find exactly what you need from our comprehensive range of tech services
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gray-100">
                    <Image
                      src={category.icon || '/icons/placeholder.svg'}
                      alt={category.name}
                      className="h-full w-full object-fill object-center"
                      width={200}
                      height={150}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary-600">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Tech Hub Ireland
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find the best technology service providers with our comprehensive directory
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Search className="h-5 w-5 flex-none text-primary-600" />
                  Easy to Search
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Find exactly what you need with our powerful search tools</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Star className="h-5 w-5 flex-none text-primary-600" />
                  Verified Reviews
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Read genuine reviews from real customers</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Shield className="h-5 w-5 flex-none text-primary-600" />
                  Trusted Providers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Connect with verified and trusted service providers</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Businesses
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Discover top-rated technology service providers across Ireland
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {topBusinesses.map((business) => (
              <article
                key={business.id}
                className="flex flex-col items-start rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={business.image}
                    alt={business.title}
                    className="h-full w-full object-cover"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime="2024" className="text-gray-500">
                      {business.location}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                      {business.category}
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                      <Link href={`/business/${business.id}`}>
                        <span className="absolute inset-0" />
                        {business.title}
                      </Link>
                    </h3>
                    <div className="mt-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {business.rating} ({business.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}