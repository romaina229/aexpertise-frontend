import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, Clock, Users, Award, 
  ArrowLeft, CheckCircle, UserPlus, 
  X, AlertCircle
} from 'lucide-react'
import api from '../services/api'
import FormationStatus from '../components/common/FormationStatus'

const ensureArray = (value) => {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  if (value && typeof value === 'object') {
    return Object.values(value)
  }
  return []
}

export default function FormationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formation, setFormation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showRegistration, setShowRegistration] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await api.get(`/formations/${id}`)
        const data = response.data
        data.objectives = ensureArray(data.objectives)
        data.program = ensureArray(data.program)
        setFormation(data)
      } catch (error) {
        console.error('Erreur:', error)
        setFormation({
          id: parseInt(id),
          title: 'Gestion de projet agile',
          description: 'Maîtrisez les méthodologies agiles pour une gestion de projet efficace.',
          duration: '3 jours',
          start_date: '2024-02-15',
          end_date: '2024-02-17',
          category: 'Gestion de projet',
          price: '250 000 FCFA',
          level: 'Intermédiaire',
          max_participants: 20,
          current_participants: 15,
          is_active: true,
          objectives: [
            'Comprendre les principes de l\'agilité',
            'Maîtriser les frameworks Scrum et Kanban',
            'Savoir gérer un backlog produit',
            'Conduire des cérémonies agiles'
          ],
          program: [
            'Jour 1: Introduction à l\'agilité et Scrum',
            'Jour 2: Kanban et gestion du backlog',
            'Jour 3: Ateliers pratiques et mise en situation'
          ],
          prerequisites: 'Aucun prérequis nécessaire'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFormation()
  }, [id])

  const canRegister = () => {
    if (!formation) return false
    const now = new Date()
    const start = new Date(formation.start_date)
    const end = formation.end_date ? new Date(formation.end_date) : null
    
    if (!formation.is_active) return false
    if (end && now > end) return false
    if (formation.current_participants >= formation.max_participants) return false
    if (now > start) return false
    
    return true
  }

  const getRegistrationButtonText = () => {
    if (!formation) return "Chargement..."
    if (!formation.is_active) return "Formation inactive"
    if (formation.current_participants >= formation.max_participants) return "Formation complète"
    if (new Date() > new Date(formation.end_date)) return "Formation expirée"
    if (new Date() > new Date(formation.start_date)) return "Formation déjà commencée"
    return "S'inscrire maintenant"
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    try {
      await api.post('/registrations', {
        ...formData,
        formation_id: formation.id
      })
      setSuccess(true)
      setShowRegistration(false)
      
      // Mettre à jour le nombre de participants
      setFormation({
        ...formation,
        current_participants: formation.current_participants + 1
      })
      
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la formation...</p>
        </div>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Formation non trouvée</h2>
          <Link to="/formations" className="text-primary hover:underline">
            Retour aux formations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour
        </button>
      </div>

      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                {formation.category}
              </span>
              <FormationStatus 
                startDate={formation.start_date}
                endDate={formation.end_date}
                isActive={formation.is_active}
                maxParticipants={formation.max_participants}
                currentParticipants={formation.current_participants}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{formation.title}</h1>
            <p className="text-xl text-gray-200 max-w-3xl">{formation.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-4">Objectifs de la formation</h2>
                <ul className="space-y-3">
                  {formation.objectives && formation.objectives.length > 0 ? (
                    formation.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Aucun objectif spécifié</li>
                  )}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-4">Programme</h2>
                <div className="space-y-4">
                  {formation.program && formation.program.length > 0 ? (
                    formation.program.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Aucun programme spécifié</p>
                  )}
                </div>
              </motion.div>

              {formation.prerequisites && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-primary mb-4">Prérequis</h2>
                  <p className="text-gray-700">{formation.prerequisites}</p>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Date de début</p>
                      <p className="font-semibold">
                        {new Date(formation.start_date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {formation.end_date && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Date de fin</p>
                        <p className="font-semibold">
                          {new Date(formation.end_date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Durée</p>
                      <p className="font-semibold">{formation.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold">
                        {formation.current_participants || 0}/{formation.max_participants}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Niveau</p>
                      <p className="font-semibold">{formation.level}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-3xl font-bold text-primary text-center">
                      {formation.price}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-4">Prix de la formation</p>
                    
                    {!canRegister() && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg mb-4 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          {!formation.is_active && "Cette formation est actuellement inactive"}
                          {formation.current_participants >= formation.max_participants && "Cette formation est complète"}
                          {new Date() > new Date(formation.end_date) && "Cette formation est expirée"}
                          {new Date() > new Date(formation.start_date) && "Cette formation a déjà commencé"}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setShowRegistration(true)}
                      disabled={!canRegister()}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                        canRegister()
                          ? 'bg-accent text-white hover:bg-accent-dark shadow-lg shadow-accent/25'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <UserPlus className="h-5 w-5" />
                      {getRegistrationButtonText()}
                    </button>
                    <Link
                      to="/contact"
                      className="block text-center text-primary hover:underline mt-3 text-sm"
                    >
                      Nous contacter pour plus d'informations
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-primary">Inscription</h2>
              <button
                onClick={() => setShowRegistration(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation *
                </label>
                <input
                  type="text"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poste occupé
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRegistration(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Inscription...' : "S'inscrire"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
          <p className="font-semibold">Inscription réussie !</p>
          <p className="text-sm">Vous recevrez un email de confirmation.</p>
        </div>
      )}
    </div>
  )
}
