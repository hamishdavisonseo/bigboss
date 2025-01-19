// components/ui/BusinessGrid.tsx
export default function BusinessGrid({ businesses = [] }) {
    if (businesses.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No results found</p>
        </div>
      )
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business: { id: string; title: string; address: string }) => (
          <div key={business.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{business.title}</h3>
            <p className="text-sm text-gray-600">{business.address}</p>
          </div>
        ))}
      </div>
    )
  }