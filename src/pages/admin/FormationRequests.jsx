import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase, X
} from 'lucide-react'
import api from '../../services/api'

export default function FormationRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRequest, setSelectedRequest] = useState(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await api.get('/formation-requests')
      setRequests(response.data)
    } catch (error) {
      console.error('Erreur:', error)
      setRequests([
        {
          id: 1,
          name: 'David Koffi',
          email: 'david@email.com',
          phone: '+229 01234569',
          organization: 'Entreprise ABC',
          position: 'Directeur',
          formation: 'Gestion de projet avancé',
          participants: 10,
          budget: '500 000 FCFA',
          message: 'Nous souhaitons former notre équipe de gestion de projet.',
          status: 'pending',
          created_at: '2024-01-15'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/formation-requests/${id}/status`, { status })
      fetchRequests()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700' },
      processing: { label: 'En traitement', color: 'bg-blue-100 text-blue-700' },
      completed: { label: 'Traité', color: 'bg-green-100 text-green-700' },
      cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-700' }
    }
    return statusMap[status] || statusMap.pending
  }

  const filteredRequests = requests.filter(req =>
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.formation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.organization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Demandes de formation</h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher une demande..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => {
          const statusBadge = getStatusBadge(req.status)
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-gray-800">{req.name}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{req.organization}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{req.position || 'Poste non spécifié'}</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-1">{req.formation}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{req.participants || 'N/A'} participants</span>
                    {req.budget && <span>• Budget: {req.budget}</span>}
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-2">{req.message}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(req.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setSelectedRequest(req)}
                    className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                    title="Voir la demande"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  {req.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(req.id, 'processing')}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Commencer le traitement"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, 'completed')}
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                        title="Marquer comme traité"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {req.status === 'processing' && (
                    <button
                      onClick={() => updateStatus(req.id, 'completed')}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                      title="Marquer comme traité"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                  {req.status !== 'cancelled' && req.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(req.id, 'cancelled')}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Annuler"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune demande de formation</p>
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Détail de la demande</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Nom</label>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Téléphone</label>
                  <p className="font-medium">{selectedRequest.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Organisation</label>
                  <p className="font-medium">{selectedRequest.organization}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Formation souhaitée</label>
                <p className="font-medium">{selectedRequest.formation}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Participants</label>
                  <p className="font-medium">{selectedRequest.participants || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Budget</label>
                  <p className="font-medium">{selectedRequest.budget || 'Non spécifié'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg mt-1">
                  <p className="whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Statut</label>
                <div className="mt-1">
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(selectedRequest.status).color}`}>
                    {getStatusBadge(selectedRequest.status).label}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
