import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, Edit, Trash2, Eye, Search,
  FileText, Video, Book, File as FileIcon,
  X, CheckCircle, XCircle, Star
} from 'lucide-react'
import { resourceService } from '../../services/api'
import { Link } from 'react-router-dom'

const typeLabels = {
  article: 'Article',
  video: 'Vidéo',
  ebook: 'E-book',
  document: 'Document',
}

const typeColors = {
  article: 'bg-blue-100 text-blue-700',
  video: 'bg-red-100 text-red-700',
  ebook: 'bg-purple-100 text-purple-700',
  document: 'bg-green-100 text-green-700',
}
const typeOptions = [
  { value: 'article', label: 'Article', icon: FileText },
  { value: 'video', label: 'Vidéo', icon: Video },
  { value: 'ebook', label: 'E-book', icon: Book },
  { value: 'document', label: 'Document', icon: FileIcon },
]

const categories = ['Gestion de projet', 'Digital', 'Leadership', 'Technique', 'Management', 'Communication']

export default function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingResource, setEditingResource] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'article',
    category: 'Gestion de projet',
    file_url: '',
    video_url: '',
    thumbnail: '',
    is_active: true,
    is_featured: false,
    published_at: '',
    tags: []
  })

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      const response = await resourceService.getAll()
      setResources(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.title) errors.title = 'Le titre est requis'
    if (!formData.description) errors.description = 'La description est requise'
    if (!formData.category) errors.category = 'La catégorie est requise'
    if (formData.type === 'video' && !formData.video_url) {
      errors.video_url = 'L\'URL de la vidéo est requise'
    }
    if (formData.type !== 'video' && !formData.file_url) {
      errors.file_url = 'L\'URL du fichier est requise'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const dataToSend = {
        ...formData,
        tags: formData.tags || []
      }

      if (editingResource) {
        await resourceService.update(editingResource.id, dataToSend)
      } else {
        await resourceService.create(dataToSend)
      }
      
      fetchResources()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      try {
        await resourceService.delete(id)
        fetchResources()
      } catch (error) {
        console.error('Erreur:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleEdit = (resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title || '',
      description: resource.description || '',
      type: resource.type || 'article',
      category: resource.category || 'Gestion de projet',
      file_url: resource.file_url || '',
      video_url: resource.video_url || '',
      thumbnail: resource.thumbnail || '',
      is_active: resource.is_active !== undefined ? resource.is_active : true,
      is_featured: resource.is_featured || false,
      published_at: resource.published_at ? resource.published_at.split('T')[0] : '',
      tags: resource.tags || []
    })
    setFormErrors({})
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingResource(null)
    setFormData({
      title: '',
      description: '',
      type: 'article',
      category: 'Gestion de projet',
      file_url: '',
      video_url: '',
      thumbnail: '',
      is_active: true,
      is_featured: false,
      published_at: '',
      tags: []
    })
    setFormErrors({})
  }

  const toggleActive = async (id, currentStatus) => {
    try {
      await resourceService.toggleActive(id)
      fetchResources()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const toggleFeatured = async (id, currentStatus) => {
    try {
      await resourceService.toggleFeatured(id)
      fetchResources()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const filteredResources = resources.filter(r =>
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold text-gray-800">Gestion des ressources</h2>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nouvelle ressource
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une ressource..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statistiques</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResources.map((resource) => {
                const TypeIcon = typeOptions.find(t => t.value === resource.type)?.icon || FileText
                return (
                  <motion.tr
                    key={resource.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <TypeIcon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-gray-900">{resource.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{resource.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${typeColors[resource.type] || 'bg-gray-100 text-gray-700'}`}>
                        {typeLabels[resource.type] || resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{resource.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 text-sm">
                        {resource.type !== 'video' && (
                          <span>📥 {resource.downloads || 0}</span>
                        )}
                        {resource.type === 'video' && (
                          <span>👁️ {resource.views || 0}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleActive(resource.id, resource.is_active)}
                          className="p-1 hover:scale-110 transition-transform"
                          title={resource.is_active ? 'Désactiver' : 'Activer'}
                        >
                          {resource.is_active ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleFeatured(resource.id, resource.is_featured)}
                          className={`p-1 hover:scale-110 transition-transform ${
                            resource.is_featured ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          title={resource.is_featured ? 'Retirer des vedettes' : 'Mettre en vedette'}
                        >
                          <Star className={`h-5 w-5 ${resource.is_featured ? 'fill-yellow-500' : ''}`} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {resource.type === 'video' && resource.video_url && (
                          <a
                            href={resource.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                            title="Voir la vidéo"
                          >
                            <Eye className="h-5 w-5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleEdit(resource)}
                          className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
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
                {editingResource ? 'Modifier la ressource' : 'Nouvelle ressource'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
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
                {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {typeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.type === 'video' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de la vidéo (YouTube/Vimeo) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.video_url ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.video_url && <p className="text-red-500 text-sm mt-1">{formErrors.video_url}</p>}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL du fichier *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://exemple.com/document.pdf"
                    value={formData.file_url}
                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      formErrors.file_url ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.file_url && <p className="text-red-500 text-sm mt-1">{formErrors.file_url}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la miniature (optionnel)
                </label>
                <input
                  type="url"
                  placeholder="https://exemple.com/thumbnail.jpg"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de publication
                  </label>
                  <input
                    type="date"
                    value={formData.published_at}
                    onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  Actif
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  ⭐ En vedette
                </label>
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
                  {editingResource ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
