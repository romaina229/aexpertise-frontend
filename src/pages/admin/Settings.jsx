import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  User, 
  Lock, 
  Mail, 
  Bell, 
  Shield,
  Globe,
  Database,
  RefreshCw
} from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const tabs = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Base de données', icon: Database },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
          Paramètres sauvegardés avec succès !
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Paramètres généraux</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du site
                </label>
                <input
                  type="text"
                  defaultValue="Expertise A+"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description du site
                </label>
                <textarea
                  rows="3"
                  defaultValue="Plateforme de formation et de conseil pour ONG, institutions et entreprises"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de contact
                </label>
                <input
                  type="email"
                  defaultValue="aexpertise@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  defaultValue="+229 01 40 15 24 43"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  defaultValue="Abomey-Calavi, Zogbadjè, Bénin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profil administrateur</h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors">
                    Changer la photo
                  </button>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG jusqu'à 2MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  defaultValue="admin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@aaexpertise.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  defaultValue="Administrateur"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sécurité</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  placeholder="Entrez votre mot de passe actuel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Entrez votre nouveau mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="Confirmez votre nouveau mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="2fa" className="w-4 h-4 text-primary" />
                  <label htmlFor="2fa" className="text-sm text-gray-700">
                    Activer l'authentification à deux facteurs (2FA)
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Nouvelles inscriptions</p>
                    <p className="text-sm text-gray-500">Recevoir une notification pour chaque nouvelle inscription</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Messages de contact</p>
                    <p className="text-sm text-gray-500">Recevoir une notification pour chaque nouveau message</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Demandes de formation</p>
                    <p className="text-sm text-gray-500">Recevoir une notification pour chaque demande de formation</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Rapports hebdomadaires</p>
                    <p className="text-sm text-gray-500">Recevoir un résumé hebdomadaire des activités</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion de la base de données</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Formations</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Inscriptions</p>
                  <p className="text-2xl font-bold text-gray-800">45</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Messages</p>
                  <p className="text-2xl font-bold text-gray-800">28</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Demandes</p>
                  <p className="text-2xl font-bold text-gray-800">6</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
                >
                  <Database className="h-4 w-4" />
                  Exporter les données
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Optimiser
                </button>
              </div>
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700">
                  ⚠️ Attention : La suppression des données est définitive.
                </p>
                <button
                  type="button"
                  className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Supprimer toutes les données
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {loading ? (
                'Enregistrement...'
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
