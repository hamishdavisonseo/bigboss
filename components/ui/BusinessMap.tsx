// components/ui/BusinessMap.tsx
'use client'

interface BusinessMapProps {
  lat: number
  lng: number
  name: string
}

export default function BusinessMap({ lat, lng, name }: BusinessMapProps) {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${lat},${lng}&zoom=15`

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
      <iframe
        title={`Map location of ${name}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
      />
      <div className="sr-only">
        Location of {name} at latitude {lat} and longitude {lng}
      </div>
    </div>
  )
}