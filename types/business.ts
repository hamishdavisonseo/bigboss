// types/business.ts
export interface Review {
  id: string; // Unique identifier for the review
  content: string; // Content of the review
  rating: number; // Rating given in the review
}


export interface BusinessData {
  rating: any; // Assuming BusinessRating is a number type
  longitude: number; // Changed to number for better type safety
  reviews: boolean;
  latitude: number; // Changed to number for better type safety
  work_hours: any; // Keep as is, unless a specific type is provided
  description: string;
  id: string; // Unique identifier for the business
  title: string; // Name of the business
  url?: string; // Optional URL for the business
  category: string; // Category of the business
  address: string; // Address of the business
  phone?: string; // Optional phone number
  main_image?: string; // Optional main image URL
  snippet?: string; // Optional snippet or description
  place_id?: string; // Optional place ID from Google
  cid?: string; // Optional CID for the business
}

export interface Business {
  id: string; // Unique identifier for the business
  title: string; // Name of the business
  url?: string; // Optional URL for the business
  category: string; // Category of the business
  rating: {
    value: number; // Rating value
    votes_count: number; // Number of votes
  };
  address: string; // Address of the business
  phone?: string; // Optional phone number
  main_image?: string; // Optional main image URL
  snippet?: string; // Optional snippet or description
  work_hours?: {
    timetable: {
      [key: string]: Array<{
        open: { hour: number; minute: number }; // Opening time
        close: { hour: number; minute: number }; // Closing time
      }> | null;
    };
    current_status: 'open' | 'closed'; // Current status of the business
  };
  latitude?: number; // Optional latitude for location
  longitude?: number; // Optional longitude for location
}