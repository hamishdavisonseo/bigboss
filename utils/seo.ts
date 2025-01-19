// src/utils/seo.ts
import { Metadata } from 'next'
import { Category, Subcategory } from '@/data/categories'

interface BusinessMetadata {
  title: string
  category: string
  address: string
  rating: {
    value: number
    votes_count: number
  }
}

export function generateCategoryMetadata(category: Category): Metadata {
  return {
    title: `${category.name} Services in Ireland | Find Local ${category.name} Experts`,
    description: `Browse top ${category.name.toLowerCase()} service providers across Ireland. Compare ratings, reviews, and services to find the right solution for your needs.`,
    openGraph: {
      title: `${category.name} Services in Ireland`,
      description: `Find the best ${category.name.toLowerCase()} service providers in your area.`,
      type: 'website',
    },
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  }
}

export function generateSubcategoryMetadata(category: Category, subcategory: Subcategory): Metadata {
  return {
    title: `${subcategory.name} in Ireland | Find Local ${subcategory.name} Services`,
    description: `Compare top-rated ${subcategory.name.toLowerCase()} providers across Ireland. Read reviews, check ratings, and contact professionals for your needs.`,
    openGraph: {
      title: `${subcategory.name} Services in Ireland`,
      description: subcategory.description,
      type: 'website',
    },
    alternates: {
      canonical: `/categories/${category.slug}/${subcategory.slug}`,
    },
  }
}

export function generateBusinessMetadata(business: BusinessMetadata): Metadata {
  return {
    title: `${business.title} | Reviews & Contact Information`,
    description: `View details, reviews, and contact information for ${business.title}. Located in ${business.address}, offering ${business.category} services. Rated ${business.rating.value}/5 from ${business.rating.votes_count} reviews.`,
    openGraph: {
      title: business.title,
      description: `${business.category} services in ${business.address}`,
      type: 'website', // Changed from 'business.business' to 'website'
    },
  }
}