import {useAuth} from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  CalendarCheck,
  TrendingUp,
  Eye,
  Clock, FileText,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    formations: { total: 0, active: 0, expired: 0, upcoming: 0 },
    registrations: { total: 0, pending: 0, confirmed: 0, cancelled: 0 },
    messages: { total: 0, unread: 0, read: 0 },
    requests: { total: 0, pending: 0, processing: 0, completed: 0 },
    recentActivities: [],
    monthlyStats: { registrations: 0, messages: 0, requests: 0 }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Récupérer toutes les données en parallèle
      const [formationsRes, registrationsRes, messagesRes, requestsRes] = await Promise.all([
        api.get('/formations'),
        api.get('/registrations'),
        api.get('/contacts'),
        api.get('/formation-requests'),
        api.get('/resources')
      ])

      const formations = formationsRes.data || []
      const registrations = registrationsRes.data || []
      const messages = messagesRes.data || []
      const requests = requestsRes.data || []
      const resources = resourcesRes.data || []

      // Statistiques des formations
      const now = new Date()
      const formationsStats = {
        total: formations.length,
        active: formations.filter(f => new Date(f.start_date) >= now && f.is_active).length,
        expired: formations.filter(f => new Date(f.start_date) < now).length,
        upcoming: formations.filter(f => new Date(f.start_date) > now).length
      }

      // Statistiques des inscriptions
      const registrationsStats = {
        total: registrations.length,
        pending: registrations.filter(r => r.status === 'pending').length,
        confirmed: registrations.filter(r => r.status === 'confirmed').length,
        cancelled: registrations.filter(r => r.status === 'cancelled').length
      }

      // Statistiques des messages
      const messagesStats = {
        total: messages.length,
        unread: messages.filter(m => !m.is_read).length,
        read: messages.filter(m => m.is_read).length
      }

      // Statistiques des demandes
      const requestsStats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        processing: requests.filter(r => r.status === 'processing').length,
        completed: requests.filter(r => r.status === 'completed').length
      }

      // Ajouter les statistiques des ressources
      const resourcesStats = {
        total: resources.length,
        videos: resources.filter(r => r.type === 'video').length,
        articles: resources.filter(r => r.type === 'article').length,
        ebooks: resources.filter(r => r.type === 'ebook').length,
        documents: resources.filter(r => r.type === 'document').length
      }

      // Activités récentes (mix des dernières actions)
      const recentActivities = [
        ...registrations.map(r => ({
          type: 'registration',
          title: `Nouvelle inscription: ${r.full_name}`,
          date: r.created_at,
          status: r.status,
          link: '/admin/registrations'
        })),
        ...messages.filter(m => !m.is_read).slice(0, 3).map(m => ({
          type: 'message',
          title: `Nouveau message de ${m.name}`,
          date: m.created_at,
          status: 'unread',
          link: '/admin/messages'
        })),
        ...requests.filter(r => r.status === 'pending').slice(0, 3).map(r => ({
          type: 'request',
          title: `Nouvelle demande: ${r.name}`,
          date: r.created_at,
          status: 'pending',
          link: '/admin/formation-requests'
        }))
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)

      // Statistiques mensuelles
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const monthlyStats = {
        registrations: registrations.filter(r => {
          const d = new Date(r.created_at)
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear
        }).length,
        messages: messages.filter(m => {
          const d = new Date(m.created_at)
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear
        }).length,
        requests: requests.filter(r => {
          const d = new Date(r.created_at)
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear
        }).length
      }

      setStats({
        formations: formationsStats,
        registrations: registrationsStats,
        messages: messagesStats,
        requests: requestsStats,
        recentActivities,
        monthlyStats,
        resources: resourcesStats
      })
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err)
      setError('Impossible de charger les données du tableau de bord')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { 
      title: 'Formations', 
      value: stats.formations.total,
      icon: BookOpen, 
      color: 'from-blue-500 to-blue-600',
      link: '/admin/formations',
      subStats: [
        { label: 'Actives', value: stats.formations.active, color: 'text-green-600' },
        { label: 'Expirées', value: stats.formations.expired, color: 'text-red-600' },
        { label: 'À venir', value: stats.formations.upcoming, color: 'text-yellow-600' },
      ]
    },
    { 
      title: 'Inscriptions', 
      value: stats.registrations.total,
      icon: Users, 
      color: 'from-green-500 to-green-600',
      link: '/admin/registrations',
      subStats: [
        { label: 'En attente', value: stats.registrations.pending, color: 'text-yellow-600' },
        { label: 'Confirmées', value: stats.registrations.confirmed, color: 'text-green-600' },
        { label: 'Annulées', value: stats.registrations.cancelled, color: 'text-red-600' },
      ]
    },
    { 
      title: 'Messages non lus', 
      value: stats.messages.unread,
      icon: MessageSquare, 
      color: 'from-yellow-500 to-yellow-600',
      link: '/admin/messages',
      subStats: [
        { label: 'Total messages', value: stats.messages.total, color: 'text-gray-600' },
        { label: 'Lus', value: stats.messages.read, color: 'text-blue-600' },
      ]
    },
    { 
      title: 'Demandes de formation', 
      value: stats.requests.total,
      icon: CalendarCheck, 
      color: 'from-purple-500 to-purple-600',
      link: '/admin/formation-requests',
      subStats: [
        { label: 'En attente', value: stats.requests.pending, color: 'text-yellow-600' },
        { label: 'En traitement', value: stats.requests.processing, color: 'text-blue-600' },
        { label: 'Traitées', value: stats.requests.completed, color: 'text-green-600' },
      ]
    },

    { 
      title: 'Ressources', 
      value: stats.resources?.total || 0,
      icon: FileText, 
      color: 'from-indigo-500 to-indigo-600',
      link: '/admin/resources',
      subStats: [
        { label: 'Vidéos', value: stats.resources?.videos || 0, color: 'text-red-600' },
        { label: 'Articles', value: stats.resources?.articles || 0, color: 'text-blue-600' },
        { label: 'E-books', value: stats.resources?.ebooks || 0, color: 'text-purple-600' },
        { label: 'Documents', value: stats.resources?.documents || 0, color: 'text-green-600' },
      ]
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        ❌ {error}
        <button 
          onClick={fetchDashboardData}
          className="ml-4 text-primary hover:underline"
        >
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
        <div className="text-sm text-gray-500">
          Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
          <button 
            onClick={fetchDashboardData}
            className="ml-4 text-primary hover:underline"
          >
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Stats Mensuelles */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Activité du mois</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-sm opacity-80">Nouvelles inscriptions</p>
            <p className="text-3xl font-bold">{stats.monthlyStats.registrations}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-sm opacity-80">Messages reçus</p>
            <p className="text-3xl font-bold">{stats.monthlyStats.messages}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <p className="text-sm opacity-80">Demandes de formation</p>
            <p className="text-3xl font-bold">{stats.monthlyStats.requests}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <Link to={stat.link} className="block">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                {stat.subStats.map((sub, idx) => (
                  <span key={idx} className={sub.color}>
                    {sub.label}: {sub.value}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Activités récentes</h3>
        <div className="space-y-3">
          {stats.recentActivities.length > 0 ? (
            stats.recentActivities.map((activity, index) => (
              <Link
                key={index}
                to={activity.link}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{activity.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'pending' || activity.status === 'unread' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : activity.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : activity.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {activity.status === 'pending' ? 'En attente' :
                       activity.status === 'unread' ? 'Non lu' :
                       activity.status === 'confirmed' ? 'Confirmé' :
                       activity.status === 'cancelled' ? 'Annulé' :
                       activity.status || 'Nouveau'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(activity.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400">
                  <Eye className="h-5 w-5" />
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">Aucune activité récente</p>
          )}
        </div>
      </div>
    </div>
  )
}