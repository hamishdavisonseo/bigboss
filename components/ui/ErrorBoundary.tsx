// src/components/ui/ErrorBoundary.tsx
'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Something went wrong</h3>
        <p className="mt-1 text-sm text-gray-500"></p>
        <div className="mt-6">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
