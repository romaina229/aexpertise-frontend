import { Link } from 'react-router-dom'
import { Search, ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-white overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Formation professionnelle et conseil
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Développer les compétences qui transforment vos projets en résultats durables
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-gray-200"
          >
            Expertise A+ accompagne les ONG, institutions, entreprises et programmes dans le renforcement des capacités, la digitalisation de la collecte de données et la gestion efficace des projets.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/formations"
              className="group flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <Search className="h-5 w-5" />
              Rechercher nos formations
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-dark transition-all transform hover:scale-105 shadow-lg shadow-accent/25"
            >
              <Play className="h-5 w-5" />
              Nous contacter
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent text-2xl font-bold">5+</span>
              <span className="text-gray-300">Années d'expérience</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent text-2xl font-bold">150+</span>
              <span className="text-gray-300">Professionnels formés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent text-2xl font-bold">5+</span>
              <span className="text-gray-300">Organisations partenaires</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
