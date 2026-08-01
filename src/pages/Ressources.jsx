import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Video, Book, Search, 
  ExternalLink, Download, File as FileIcon,
  Play, Eye, Calendar, Tag, X
} from 'lucide-react'
import { resourceService } from '../services/api'

const types = ['Tous', 'article', 'video', 'ebook', 'document']

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

const typeIcons = {
  article: FileText,
  video: Video,
  ebook: Book,
  document: FileIcon,
}

export default function Ressources() {
  const [resources, setResources] = useState([])
  const [filteredResources, setFilteredResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('Tous')
  const [selectedResource, setSelectedResource] = useState(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setLoading(true)
      const response = await resourceService.getAll()
      setResources(response.data)
      setFilteredResources(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error)
      // Données fictives en cas d'erreur
      setResources([])
      setFilteredResources([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = resources
    if (selectedType !== 'Tous') {
      result = result.filter(r => r.type === selectedType)
    }
    if (searchTerm) {
      result = result.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredResources(result)
  }, [searchTerm, selectedType, resources])

  const handleResourceClick = async (resource) => {
    if (resource.type === 'video') {
      // Ouvrir le modal vidéo
      setSelectedResource(resource)
      setShowVideoModal(true)
      // Incrémenter les vues
      try {
        await resourceService.incrementViews(resource.id)
        // Mettre à jour le compteur local
        setResources(prev => 
          prev.map(r => 
            r.id === resource.id 
              ? { ...r, views: (r.views || 0) + 1 }
              : r
          )
        )
      } catch (error) {
        console.error('Erreur lors du comptage des vues:', error)
      }
    } else {
      // Pour les autres types, ouvrir dans un nouvel onglet
      if (resource.file_url) {
        window.open(resource.file_url, '_blank')
        // Incrémenter les téléchargements
        try {
          await resourceService.incrementDownloads(resource.id)
          setResources(prev => 
            prev.map(r => 
              r.id === resource.id 
                ? { ...r, downloads: (r.downloads || 0) + 1 }
                : r
            )
          )
        } catch (error) {
          console.error('Erreur lors du comptage des téléchargements:', error)
        }
      }
    }
  }

  const getEmbedUrl = (url) => {
    // YouTube
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    // YouTube Shorts
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('shorts/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    // YouTube embed
    if (url.includes('youtube.com/embed/')) {
      return url
    }
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('/')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des ressources...</p>
        </div>
      </div>
    )
  }

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
            <p className="text-sm text-gray-300 mt-2">
              {resources.length} ressources disponibles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b sticky top-20 z-20">
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
          </div>
          <div className="flex gap-2 overflow-x-auto mt-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors ${
                  selectedType === type
                    ? 'bg-accent text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {type === 'Tous' ? 'Tous' : typeLabels[type]}
              </button>
            ))}
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

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Aucune ressource ne correspond à vos critères</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => {
                const Icon = typeIcons[resource.type] || FileText
                const typeLabel = typeLabels[resource.type] || resource.type
                const typeColor = typeColors[resource.type] || 'bg-gray-100 text-gray-700'

                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    {/* Thumbnail ou icône en grand */}
                    {resource.type === 'video' && resource.thumbnail ? (
                      <div className="relative h-48 bg-gray-900">
                        <img 
                          src={resource.thumbnail} 
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        {resource.views > 0 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {resource.views}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                        <Icon className="h-20 w-20 text-primary/30 group-hover:text-primary/50 transition-colors" />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColor}`}>
                          {typeLabel}
                        </span>
                        {resource.is_featured && (
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                            ⭐ En vedette
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Tag className="h-4 w-4" />
                          <span>{resource.category}</span>
                          <span>•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(resource.published_at || resource.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-400 border-t pt-3">
                        <div className="flex items-center gap-4">
                          {resource.type !== 'video' && (
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>{resource.downloads || 0}</span>
                            </div>
                          )}
                          {resource.type === 'video' && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{resource.views || 0} vues</span>
                            </div>
                          )}
                        </div>
                        <span className="text-primary font-semibold group-hover:text-accent transition-colors flex items-center gap-1">
                          {resource.type === 'video' ? 'Regarder' : 'Télécharger'}
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && selectedResource && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowVideoModal(false)
              setSelectedResource(null)
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {selectedResource.title}
              </h3>
              <button
                onClick={() => {
                  setShowVideoModal(false)
                  setSelectedResource(null)
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              {/* Lecteur vidéo */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {selectedResource.video_url && (
                  <iframe
                    ref={videoRef}
                    src={getEmbedUrl(selectedResource.video_url)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedResource.title}
                  />
                )}
              </div>
              <div className="mt-4">
                <p className="text-gray-600">{selectedResource.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span>📂 {selectedResource.category}</span>
                  <span>•</span>
                  <span>👁️ {selectedResource.views || 0} vues</span>
                  <span>•</span>
                  <span>📅 {new Date(selectedResource.published_at || selectedResource.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}