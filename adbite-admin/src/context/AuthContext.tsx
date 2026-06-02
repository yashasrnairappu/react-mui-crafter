import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { verifyAuth, logout as apiLogout } from '../api'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  setAuthenticated: (val: boolean) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading]           = useState(true)
  

useEffect(() => {
  const checkAuth = async () => {
    try {
      const isValid = await verifyAuth() 
      setAuthenticated(isValid)          
    } catch {
      setAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }
  checkAuth()
}, [])

  const logout = async () => {
    try {
      await apiLogout()
    } finally {
      setAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, setAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}