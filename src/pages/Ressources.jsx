import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Video, Book, Search, 
  Filter, ExternalLink, Download 
} from 'lucide-react'

const resources = [
  {
    id: 1,
    type: 'article',
    title: 'Guide de gestion de projet',
    description: 'Les bonnes pratiques pour une gestion de projet efficace',
    category: 'Gestion de projet',
    date: '2024-01-10',
    icon: FileText,
    link: '#',
    downloads: 125
  },
  {
    id: 2,
    type: 'video',
    title: 'Introduction à la digitalisation',
    description: 'Comprendre les enjeux de la digitalisation des données',
    category: 'Digital',
    date: '2024-01-05',
    icon: Video,
    link: '#',
    views: 450
  },
  {
    id: 3,
    type: 'ebook',
    title: 'Leadership et management',
    description: 'Développez votre leadership pour une équipe performante',
    category: 'Leadership',
    date: '2024-01-01',
    icon: Book,
    link: '#',
    downloads: 89
  },
  {
    id: 4,
    type: 'article',
    title: 'Méthodologies agiles',
    description: 'Guide pratique des méthodologies agiles en entreprise',
    category: 'Gestion de projet',
    date: '2023-12-20',
    icon: FileText,
    link: '#',
    downloads: 78
  },
  {
    id: 5,
    type: 'video',
    title: 'Analyse de données avec Excel',
    description: 'Tutoriel complet sur l\'analyse de données avec Excel',
    category: 'Technique',
    date: '2023-12-15',
    icon: Video,
    link: '#',
    views: 320
  },
  {
    id: 6,
    type: 'ebook',
    title: 'Guide de la digitalisation',
    description: 'Stratégies et outils pour réussir votre transformation digitale',
    category: 'Digital',
    date: '2023-12-10',
    icon: Book,
    link: '#',
    downloads: 156
  }
]

const categories = ['Toutes', 'Gestion de projet', 'Digital', 'Leadership', 'Technique']
const types = ['Tous', 'article', 'video', 'ebook']

const typeLabels = {
  article: 'Article',
  video: 'Vidéo',
  ebook: 'E-book'
}

const typeColors = {
  article: 'bg-blue-100 text-blue-700',
  video: 'bg-red-100 text-red-700',
  ebook: 'bg-purple-100 text-purple-700'
}

export default function Ressources() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [selectedType, setSelectedType] = useState('Tous')

  const filteredResources = resources.filter(resource => {
    const matchSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'Toutes' || resource.category === selectedCategory
    const matchType = selectedType === 'Tous' || resource.type === selectedType
    return matchSearch && matchCategory && matchType
  })

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ressources</h1>
            <p className="text-xl text-gray-200">
              Articles, vidéos et guides pour approfondir vos connaissances
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
                placeholder="Rechercher une ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Filter className="h-5 w-5 text-gray-400 mt-2" />
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

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} trouvée{filteredResources.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon
              const typeLabel = typeLabels[resource.type] || resource.type
              const typeColor = typeColors[resource.type] || 'bg-gray-100 text-gray-700'
              
              return (
                <motion.a
                  key={resource.id}
                  href={resource.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColor}`}>
                        {typeLabel}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{resource.category}</span>
                        <span>•</span>
                        <span>{new Date(resource.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:text-accent transition-colors">
                        Voir
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    {resource.downloads && (
                      <div className="mt-3 flex items-center gap-1 text-sm text-gray-400">
                        <Download className="h-4 w-4" />
                        {resource.downloads} téléchargements
                      </div>
                    )}
                    {resource.views && (
                      <div className="mt-3 flex items-center gap-1 text-sm text-gray-400">
                        <span>👁️ {resource.views} vues</span>
                      </div>
                    )}
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
