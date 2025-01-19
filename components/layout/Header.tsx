// components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { categories } from '@/data/categories'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Group categories into columns for desktop menu
  const categoryColumns = categories.reduce((acc, category, i) => {
    const columnIndex = Math.floor(i / 4) // 4 items per column
    if (!acc[columnIndex]) acc[columnIndex] = []
    acc[columnIndex].push(category)
    return acc
  }, [] as typeof categories[])

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-primary-600">Tech Hub Ireland</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative group">
              <button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Categories
              </button>
              <div className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 grid-cols-2">
                    {categoryColumns.map((column, columnIndex) => (
                      <div key={columnIndex} className="space-y-4">
                        {column.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="block p-3 rounded-lg hover:bg-gray-50"
                          >
                            <p className="text-base font-semibold text-gray-900">
                              {category.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {category.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}