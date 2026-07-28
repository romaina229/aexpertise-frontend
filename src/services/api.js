import axios from 'axios'

// Configuration de l'URL de base de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Création de l'instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 secondes
})

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Récupérer le token d'authentification si présent
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Logging en développement
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data || '')
    }
    
    return config
  },
  (error) => {
    console.error('❌ Erreur de requête:', error)
    return Promise.reject(error)
  }
)

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    // Logging en développement
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.status} ${response.config.url}`, response.data)
    }
    return response
  },
  (error) => {
    // Gestion des erreurs
    if (error.response) {
      // Le serveur a répondu avec un statut d'erreur
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Non authentifié - rediriger vers login
          localStorage.removeItem('auth_token')
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('🔒 Accès interdit')
          break
        case 404:
          console.error('📄 Ressource non trouvée')
          break
        case 422:
          // Erreur de validation
          if (data.errors) {
            const errorMessages = Object.values(data.errors).flat()
            console.error('⚠️ Erreurs de validation:', errorMessages)
          }
          break
        case 429:
          console.error('⏳ Trop de requêtes, veuillez réessayer plus tard')
          break
        case 500:
          console.error('💥 Erreur serveur')
          break
        default:
          console.error(`❌ Erreur ${status}:`, data?.message || 'Erreur inconnue')
      }
      
      // Message d'erreur personnalisé
      const errorMessage = data?.message || data?.error || 'Une erreur est survenue'
      error.userMessage = errorMessage
      
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      console.error('🌐 Pas de réponse du serveur:', error.request)
      error.userMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion.'
    } else {
      // Erreur lors de la configuration de la requête
      console.error('⚙️ Erreur de configuration:', error.message)
      error.userMessage = 'Une erreur est survenue lors de la préparation de la requête.'
    }
    
    return Promise.reject(error)
  }
)

// ==================== SERVICES API ====================

// === Formations ===
export const formationService = {
  // Récupérer toutes les formations
  getAll: (params = {}) => api.get('/formations', { params }),
  
  // Récupérer une formation par ID
  getById: (id) => api.get(`/formations/${id}`),
  
  // Créer une formation (admin)
  create: (data) => api.post('/formations', data),
  
  // Mettre à jour une formation (admin)
  update: (id, data) => api.put(`/formations/${id}`, data),
  
  // Supprimer une formation (admin)
  delete: (id) => api.delete(`/formations/${id}`),
  
  // Récupérer les formations par catégorie
  getByCategory: (category) => api.get('/formations', { params: { category } }),
}

// === Inscriptions ===
export const registrationService = {
  // S'inscrire à une formation
  register: (data) => api.post('/registrations', data),
  
  // Récupérer toutes les inscriptions (admin)
  getAll: () => api.get('/registrations'),
  
  // Mettre à jour une inscription (admin)
  update: (id, data) => api.put(`/registrations/${id}`, data),
  
  // Annuler une inscription
  cancel: (id) => api.delete(`/registrations/${id}`),
}

// === Demandes de formation ===
export const formationRequestService = {
  // Soumettre une demande de formation
  submit: (data) => api.post('/formation-requests', data),
  
  // Récupérer toutes les demandes (admin)
  getAll: () => api.get('/formation-requests'),
  
  // Mettre à jour une demande (admin)
  update: (id, data) => api.put(`/formation-requests/${id}`, data),
}

// === Contact ===
export const contactService = {
  // Envoyer un message de contact
  send: (data) => api.post('/contact', data),
}

// === Utilisateurs (si authentification) ===
export const userService = {
  // Connexion
  login: (credentials) => api.post('/login', credentials),
  
  // Inscription
  register: (data) => api.post('/register', data),
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('auth_token')
    return api.post('/logout')
  },
  
  // Récupérer le profil utilisateur
  getProfile: () => api.get('/user/profile'),
  
  // Mettre à jour le profil
  updateProfile: (data) => api.put('/user/profile', data),
}

// ==================== FONCTIONS UTILITAIRES ====================

// Gestion du token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }
}

// Vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token')
}

// Récupérer le token
export const getAuthToken = () => {
  return localStorage.getItem('auth_token')
}

// ==================== EXPORT PAR DÉFAUT ====================

export default api

// === Authentification ===
export const authService = {
  // Connexion
  login: (credentials) => api.post('/login', credentials),
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
  },
  
  // Vérifier si l'utilisateur est authentifié
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token')
  },
  
  // Récupérer l'utilisateur connecté
  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}
