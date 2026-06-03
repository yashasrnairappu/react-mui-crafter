import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  withCredentials: true,
})


export interface LocationStats {
  seats: string
  bills: string
  time: string
  footfall: string
  size: string
  nearestPlaces: string
}

export interface City {
  name: string
  count: number
}

export interface Location {
  _id: string
  name: string
  city:string
  images: string[]
  stats: LocationStats
}

// Auth
export const login = (password: string) =>
  api.post<{ message: string }>('/api/auth/login', { password })

export const logout = () =>
  api.post<{ message: string }>('/api/auth/logout')

export const verifyAuth = async (): Promise<boolean> => {
  try {
    const res = await api.get("/api/auth/verify");
    return res.data.valid === true;
  } catch (err: any) {
    return false;
  }
};
// Locations
export const getLocations = () =>
  api.get<{ locations: Location[] }>('/api/locations')

export const createLocation = (formData: FormData) =>
  api.post<{ location: Location }>('/api/addlocations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateLocation = (id: string, formData: FormData) =>
  api.put<{ location: Location }>(`/api/location/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const deleteLocation = (id: string) =>
  api.delete<{ message: string }>(`/api/location/${id}`)



export const getCities = () =>
  api.get<{ success: boolean; cities: City[] }>('/api/location/cities')

export default api
