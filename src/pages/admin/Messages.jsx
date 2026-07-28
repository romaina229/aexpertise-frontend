import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Eye,
  Trash2,
  Mail,
  MailOpen,
  Clock, X
} from 'lucide-react'
import api from '../../services/api'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contacts')
      setMessages(response.data)
    } catch (error) {
      console.error('Erreur:', error)
      setMessages([
        {
          id: 1,
          name: 'Paul Mensah',
          email: 'paul@email.com',
          subject: 'Demande de formation',
          message: 'Bonjour, je souhaiterais avoir plus d\'informations sur vos formations en gestion de projet.',
          is_read: false,
          created_at: '2024-01-15'
        },
        {
          id: 2,
          name: 'Aminata Diallo',
          email: 'aminata@email.com',
          subject: 'Question sur les tarifs',
          message: 'Pourriez-vous me faire un devis pour une formation de 20 personnes ?',
          is_read: true,
          created_at: '2024-01-14'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.post(`/contacts/${id}/read`)
      fetchMessages()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const deleteMessage = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        await api.delete(`/contacts/${id}`)
        fetchMessages()
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
  }

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des messages</h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow ${
              !msg.is_read ? 'border-l-4 border-primary' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {msg.is_read ? (
                      <MailOpen className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Mail className="h-5 w-5 text-primary" />
                    )}
                    <span className="font-semibold text-gray-800">{msg.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{msg.email}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{msg.subject}</span>
                </div>
                <p className="text-gray-600 mb-2">{msg.message}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {!msg.is_read && (
                    <span className="text-primary font-medium">Non lu</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {!msg.is_read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Marquer comme lu"
                  >
                    <MailOpen className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedMessage(msg)}
                  className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                  title="Voir le message"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun message trouvé</p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Détail du message</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Nom</label>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Sujet</label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg mt-1">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="text-gray-600">
                  {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    if (!selectedMessage.is_read) {
                      markAsRead(selectedMessage.id)
                    }
                    setSelectedMessage(null)
                  }}
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
