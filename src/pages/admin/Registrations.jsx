import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Eye, CheckCircle, XCircle, 
  Clock, Filter, X, User, Mail, Phone, 
  Building, Calendar, MessageSquare,Users
} from 'lucide-react'
import api from '../../services/api'

export default function Registrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedRegistration, setSelectedRegistration] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await api.get('/registrations')
      setRegistrations(response.data)
    } catch (error) {
      console.error('Erreur:', error)
      // Données fictives pour test
      setRegistrations([
        {
          id: 1,
          full_name: 'Jean Dupont',
          email: 'jean@email.com',
          phone: '+229 01234567',
          organization: 'ONG Espoir',
          position: 'Coordinateur',
          formation: { title: 'Gestion de projet agile' },
          status: 'pending',
          created_at: '2024-01-15',
          message: 'Je souhaite participer à cette formation pour améliorer mes compétences en gestion de projet.'
        },
        {
          id: 2,
          full_name: 'Marie Kouassi',
          email: 'marie@email.com',
          phone: '+229 01234568',
          organization: 'Ministère de la Santé',
          position: 'Chef de projet',
          formation: { title: 'Digitalisation des données' },
          status: 'confirmed',
          created_at: '2024-01-14',
          message: 'Très intéressée par cette formation sur la digitalisation.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/registrations/${id}`, { status })
      fetchRegistrations()
      // Fermer le modal si ouvert
      if (selectedRegistration?.id === id) {
        setSelectedRegistration({ ...selectedRegistration, status })
      }
    } catch (error) {
      //console.error('Erreur:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      confirmed: { label: 'Confirmé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-700', icon: XCircle }
    }
    return statusMap[status] || statusMap.pending
  }

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration)
    setShowDetailModal(true)
  }

  const filteredRegistrations = registrations.filter(reg => {
    const matchSearch = reg.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        reg.formation?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFilter = filter === 'all' || reg.status === filter
    return matchSearch && matchFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des inscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des inscriptions</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une inscription..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Tous ({registrations.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            En attente ({registrations.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Confirmé ({registrations.filter(r => r.status === 'confirmed').length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRegistrations.map((reg) => {
                const statusBadge = getStatusBadge(reg.status)
                const StatusIcon = statusBadge.icon
                return (
                  <motion.tr
                    key={reg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{reg.full_name}</div>
                      <div className="text-sm text-gray-500">{reg.organization}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{reg.email}</div>
                      <div className="text-sm text-gray-500">{reg.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{reg.formation?.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${statusBadge.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(reg.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Bouton Voir Détails */}
                        <button
                          onClick={() => handleViewDetails(reg)}
                          className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        
                        {reg.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(reg.id, 'confirmed')}
                              className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirmer"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateStatus(reg.id, 'cancelled')}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Annuler"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        {reg.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(reg.id, 'cancelled')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Annuler"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Détails */}
      <AnimatePresence>
        {showDetailModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {selectedRegistration.full_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Inscription #{selectedRegistration.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowDetailModal(false)
                      setSelectedRegistration(null)
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Statut */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Statut actuel</p>
                    <div className="mt-1">
                      {(() => {
                        const statusBadge = getStatusBadge(selectedRegistration.status)
                        const StatusIcon = statusBadge.icon
                        return (
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusBadge.color}`}>
                            <StatusIcon className="h-4 w-4" />
                            {statusBadge.label}
                          </span>
                        )
                      })()}
                    </div>
                  </div>
                  
                  {selectedRegistration.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          updateStatus(selectedRegistration.id, 'confirmed')
                          setSelectedRegistration({ ...selectedRegistration, status: 'confirmed' })
                        }}
                        className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Confirmer
                      </button>
                      <button
                        onClick={() => {
                          updateStatus(selectedRegistration.id, 'cancelled')
                          setSelectedRegistration({ ...selectedRegistration, status: 'cancelled' })
                        }}
                        className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                        Annuler
                      </button>
                    </div>
                  )}
                </div>

                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Nom complet</span>
                    </div>
                    <p className="font-medium text-gray-800">{selectedRegistration.full_name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">Email</span>
                    </div>
                    <p className="font-medium text-gray-800">{selectedRegistration.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">Téléphone</span>
                    </div>
                    <p className="font-medium text-gray-800">{selectedRegistration.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Building className="h-4 w-4" />
                      <span className="text-sm">Organisation</span>
                    </div>
                    <p className="font-medium text-gray-800">{selectedRegistration.organization}</p>
                  </div>
                </div>

                {/* Formation */}
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Formation choisie</span>
                  </div>
                  <p className="font-semibold text-gray-800">{selectedRegistration.formation?.title}</p>
                  {selectedRegistration.position && (
                    <p className="text-sm text-gray-500 mt-1">Poste: {selectedRegistration.position}</p>
                  )}
                </div>

                {/* Message */}
                {selectedRegistration.message && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">Message</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedRegistration.message}</p>
                  </div>
                )}

                {/* Date */}
                <div className="text-center text-sm text-gray-400 border-t pt-4">
                  Inscription du {new Date(selectedRegistration.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 rounded-b-2xl">
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    setSelectedRegistration(null)
                  }}
                  className="w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Message si aucune inscription */}
      {filteredRegistrations.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucune inscription trouvée</p>
        </div>
      )}
    </div>
  )
}
