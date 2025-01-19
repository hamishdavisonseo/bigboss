// components/ui/BusinessHours.tsx
'use client'

import { Clock } from 'lucide-react'

interface TimeSlot {
  open: { hour: number; minute: number }
  close: { hour: number; minute: number }
}

interface WorkHours {
  timetable: {
    [key: string]: TimeSlot[] | null
  }
  current_status: 'open' | 'closed'
}

interface BusinessHoursProps {
  hours: WorkHours
}

export default function BusinessHours({ hours }: BusinessHoursProps) {
  const formatTime = (time: { hour: number; minute: number }) => {
    return new Date(0, 0, 0, time.hour, time.minute)
      .toLocaleTimeString('en-IE', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
  }

  const days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 
    'friday', 'saturday', 'sunday'
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-primary-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
      </div>

      <div className="space-y-3">
        {days.map((day) => (
          <div key={day} className="flex justify-between text-sm">
            <span className="font-medium capitalize">{day}</span>
            <span className="text-gray-600">
              {hours.timetable[day]?.[0] ? (
                `${formatTime(hours.timetable[day]![0].open)} - ${formatTime(hours.timetable[day]![0].close)}`
              ) : (
                'Closed'
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            hours.current_status === 'open' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className={`text-sm font-medium ${
            hours.current_status === 'open' ? 'text-green-600' : 'text-red-600'
          }`}>
            Currently {hours.current_status}
          </span>
        </div>
      </div>
    </div>
  )
}