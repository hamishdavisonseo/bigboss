// types/business.ts
export interface Business {
    id: string
    title: string
    url?: string
    category: string
    rating: {
      value: number
      votes_count: number
    }
    address: string
    phone?: string
    main_image?: string
    snippet?: string
    work_hours?: {
      timetable: {
        [key: string]: Array<{
          open: { hour: number; minute: number }
          close: { hour: number; minute: number }
        }> | null
      }
      current_status: 'open' | 'closed'
    }
    latitude?: number
    longitude?: number
  }