import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, Edit, Trash2, Eye,
  Search, Calendar, Clock, Users, X
} from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import FormationStatus from '../../components/common/FormationStatus'

export default function Formations() {
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingFormation, setEditingFormation] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    category: '',
    level: 'Débutant',
    start_date: '',
    end_date: '',
    max_participants: 20,
    objectives: [],
    program: [],
    prerequisites: ''
  })

  useEffect(() => {
    fetchFormations()
  }, [])

  const fetchFormations = async () => {
    try {
      const response = await api.get('/formations')
      setFormations(response.data)
    } catch (error) {
      //console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title) errors.title = 'Le titre est requis'
    if (!formData.description) errors.description = 'La description est requise'
    if (!formData.duration) errors.duration = 'La durée est requise'
    if (!formData.price) errors.price = 'Le prix est requis'
    if (!formData.category) errors.category = 'La catégorie est requise'
    if (!formData.start_date) errors.start_date = 'La date de début est requise'
    if (!formData.max_participants || formData.max_participants < 1) {
      errors.max_participants = 'Le nombre de participants doit être supérieur à 0'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const dataToSend = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        duration: formData.duration.trim(),
        price: formData.price.trim(),
        category: formData.category.trim(),
        level: formData.level || 'Débutant',
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        max_participants: parseInt(formData.max_participants) || 20,
        objectives: formData.objectives || [],
        program: formData.program || [],
        prerequisites: formData.prerequisites || ''
      }

      if (editingFormation) {
        await api.put(`/formations/${editingFormation.id}`, dataToSend)
      } else {
        await api.post('/formations', dataToSend)
      }
      
      fetchFormations()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Erreur détaillée:', error.response?.data)
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors)
      } else {
        alert('Erreur lors de la sauvegarde: ' + (error.response?.data?.message || 'Erreur inconnue'))
      }
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await api.delete(`/formations/${id}`)
        fetchFormations()
      } catch (error) {
        console.error('Erreur:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleEdit = (formation) => {
    setEditingFormation(formation)
    setFormData({
      title: formation.title || '',
      description: formation.description || '',
      duration: formation.duration || '',
      price: formation.price || '',
      category: formation.category || '',
      level: formation.level || 'Débutant',
      start_date: formation.start_date ? formation.start_date.split('T')[0] : '',
      end_date: formation.end_date ? formation.end_date.split('T')[0] : '',
      max_participants: formation.max_participants || 20,
      objectives: formation.objectives || [],
      program: formation.program || [],
      prerequisites: formation.prerequisites || ''
    })
    setFormErrors({})
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingFormation(null)
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: '',
      category: '',
      level: 'Débutant',
      start_date: '',
      end_date: '',
      max_participants: 20,
      objectives: [],
      program: [],
      prerequisites: ''
    })
    setFormErrors({})
  }

  const filteredFormations = formations.filter(f =>
    f.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des formations</h2>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nouvelle formation
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFormations.map((formation) => (
                <motion.tr
                  key={formation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{formation.title}</div>
                    <div className="text-sm text-gray-500">{formation.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {formation.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{formation.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{formation.current_participants || 0}/{formation.max_participants}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <FormationStatus 
                      startDate={formation.start_date}
                      endDate={formation.end_date}
                      isActive={formation.is_active}
                      maxParticipants={formation.max_participants}
                      currentParticipants={formation.current_participants || 0}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/formations/${formation.id}`}
                        target="_blank"
                        className="p-1 text-gray-400 hover:text-primary transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleEdit(formation)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(formation.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {editingFormation ? 'Modifier la formation' : 'Nouvelle formation'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    formErrors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 3 jours"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.duration ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.duration && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.duration}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 250 000 FCFA"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.start_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.start_date && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.start_date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Participants max *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.max_participants ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.max_participants && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.max_participants}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prérequis
                </label>
                <input
                  type="text"
                  value={formData.prerequisites}
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                  placeholder="Ex: Connaissances de base en informatique"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition-colors"
                >
                  {editingFormation ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
