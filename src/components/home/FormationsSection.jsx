import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import api from '../../services/api'

export default function FormationsSection() {
  const [formations, setFormations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await api.get('/formations?limit=3')
        setFormations(response.data)
      } catch (error) {
        setFormations([
          {
            id: 1,
            title: 'Gestion de projet agile',
            description: 'Maîtrisez les méthodologies agiles pour une gestion de projet efficace.',
            duration: '3 jours',
            start_date: '2024-01-15',
            category: 'Gestion de projet',
            price: '250 000 FCFA'
          },
          {
            id: 2,
            title: 'Digitalisation des données',
            description: 'Apprenez à collecter et analyser des données avec des outils digitaux.',
            duration: '2 jours',
            start_date: '2024-01-22',
            category: 'Digital',
            price: '200 000 FCFA'
          },
          {
            id: 3,
            title: 'Leadership et gestion d\'équipe',
            description: 'Développez vos compétences en leadership pour une équipe performante.',
            duration: '4 jours',
            start_date: '2024-02-05',
            category: 'Leadership',
            price: '300 000 FCFA'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFormations()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des formations...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nos formations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Formations professionnelles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des programmes conçus pour répondre aux besoins spécifiques de votre organisation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
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
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formation.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(formation.start_date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <Link
                  to={`/formations/${formation.id}`}
                  className="inline-flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors group"
                >
                  Voir la formation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-light transition-all transform hover:scale-105"
          >
            Voir toutes nos formations
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
