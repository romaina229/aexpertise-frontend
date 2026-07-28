import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { authService } from '../services/api'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('auth_token')
    if (token) {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials)
      const { token, user } = response.data
      
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Erreur de connexion' }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    navigate('/login')
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem('auth_token')
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  }
}
