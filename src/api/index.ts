import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
})

export interface LocationStats {
  seats: string
  bills: string
  time: string
  footfall: string
  size: string
  nearestPlaces: string
}

export interface Location {
  _id: string
  name: string
  city: string
  images: string[]
  stats: LocationStats
  isActive: boolean
  createdAt: string
}

// GET all locations
export const getLocations = () =>
  api.get<{ success: boolean; locations: Location[] }>('/api/locations')

// GET single location by ID
export const getSingleLocation = (id: string) =>
  api.get<{ success: boolean; location: Location }>(`/api/location/${id}`)

// GET unique cities
export const getCities = () =>
  api.get<{ success: boolean; cities: string[] }>('/api/cities')