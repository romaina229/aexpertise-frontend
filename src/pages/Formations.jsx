import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, Search, ArrowRight } from 'lucide-react'
import api from '../services/api'

const categories = ['Toutes', 'Gestion de projet', 'Digital', 'Leadership', 'Technique', 'Management']

export default function Formations() {
  const [formations, setFormations] = useState([])
  const [filteredFormations, setFilteredFormations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await api.get('/formations')
        setFormations(response.data)
        setFilteredFormations(response.data)
      } catch (error) {
        console.error('Erreur:', error)
        // Données fictives
        const mockData = [
          {
            id: 1,
            title: 'Gestion de projet agile',
            description: 'Maîtrisez les méthodologies agiles pour une gestion de projet efficace.',
            duration: '3 jours',
            start_date: '2024-01-15',
            category: 'Gestion de projet',
            price: '250 000 FCFA',
            level: 'Intermédiaire',
            max_participants: 20,
            current_participants: 15
          },
          {
            id: 2,
            title: 'Digitalisation des données',
            description: 'Apprenez à collecter et analyser des données avec des outils digitaux.',
            duration: '2 jours',
            start_date: '2024-01-22',
            category: 'Digital',
            price: '200 000 FCFA',
            level: 'Débutant',
            max_participants: 15,
            current_participants: 12
          },
          {
            id: 3,
            title: 'Leadership et gestion d\'équipe',
            description: 'Développez vos compétences en leadership pour une équipe performante.',
            duration: '4 jours',
            start_date: '2024-02-05',
            category: 'Leadership',
            price: '300 000 FCFA',
            level: 'Avancé',
            max_participants: 25,
            current_participants: 18
          },
          {
            id: 4,
            title: 'Analyse de données avec Excel',
            description: 'Maîtrisez les outils avancés d\'Excel pour l\'analyse de données.',
            duration: '2 jours',
            start_date: '2024-02-12',
            category: 'Technique',
            price: '150 000 FCFA',
            level: 'Débutant',
            max_participants: 20,
            current_participants: 10
          },
          {
            id: 5,
            title: 'Management stratégique',
            description: 'Les fondamentaux du management pour piloter votre organisation.',
            duration: '5 jours',
            start_date: '2024-02-20',
            category: 'Management',
            price: '350 000 FCFA',
            level: 'Avancé',
            max_participants: 30,
            current_participants: 22
          }
        ]
        setFormations(mockData)
        setFilteredFormations(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchFormations()
  }, [])

  useEffect(() => {
    let result = formations

    if (selectedCategory !== 'Toutes') {
      result = result.filter(f => f.category === selectedCategory)
    }

    if (searchTerm) {
      result = result.filter(f =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredFormations(result)
  }, [searchTerm, selectedCategory, formations])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos formations</h1>
            <p className="text-xl text-gray-200">
              Des programmes conçus pour développer vos compétences et booster votre carrière
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredFormations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucune formation ne correspond à vos critères</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                        {formation.category}
                      </span>
                      <span className="text-accent font-bold text-lg">
                        {formation.price}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {formation.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formation.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(formation.start_date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {formation.current_participants}/{formation.max_participants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Niveau: {formation.level}
                      </span>
                      <Link
                        to={`/formations/${formation.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary-light transition-colors"
                      >
                        Voir la formation
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
