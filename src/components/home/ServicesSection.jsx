import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, BarChart3, Target, Briefcase, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Users,
    title: 'Renforcement des capacités',
    description: 'Formation sur mesure pour développer les compétences de vos équipes.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Digitalisation des données',
    description: 'Collecte et analyse de données avec des outils modernes.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Target,
    title: 'Gestion de projets',
    description: 'Méthodologies agiles et outils de suivi pour vos projets.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Briefcase,
    title: 'Consulting stratégique',
    description: 'Accompagnement personnalisé pour vos projets stratégiques.',
    color: 'from-orange-500 to-orange-600'
  }
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nos services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Des solutions adaptées à vos besoins
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous proposons une gamme complète de services pour accompagner votre organisation vers l'excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link to="/services" className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition-colors">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
