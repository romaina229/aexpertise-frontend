import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'
import api, { setAuthToken } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })

  // Rediriger si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      navigate('/admin')
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validation basique
      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs')
        setLoading(false)
        return
      }

      // Appel API réel
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password
      })

      // Vérifier la réponse
      if (response.data && response.data.token) {
        // Stocker le token
        setAuthToken(response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        // Rediriger vers le dashboard
        navigate('/admin')
      } else {
        setError('Réponse invalide du serveur')
      }
    } catch (err) {
      console.error('Erreur de connexion:', err)
      
      // Gérer les erreurs
      if (err.response) {
        if (err.response.status === 401) {
          setError('Email ou mot de passe incorrect')
        } else if (err.response.status === 403) {
          setError('Accès non autorisé. Contactez l\'administrateur.')
        } else if (err.response.status === 422) {
          const errors = err.response.data.errors
          if (errors) {
            const firstError = Object.values(errors)[0]?.[0] || 'Données invalides'
            setError(firstError)
          } else {
            setError(err.response.data.message || 'Données invalides')
          }
        } else {
          setError(err.response.data?.message || 'Une erreur est survenue')
        }
      } else if (err.request) {
        setError('Impossible de contacter le serveur. Vérifiez votre connexion.')
      } else {
        setError('Une erreur est survenue lors de la connexion')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">À+ Expertise</h1>
          <p className="text-gray-500 mt-2">Panel d'administration</p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-2"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@aaexpertise.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              Se souvenir de moi
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Connexion en cours...
              </div>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Se connecter
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Accès réservé aux administrateurs
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Expertise A+</span>
            <span>•</span>
            <span>Tous droits réservés</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
