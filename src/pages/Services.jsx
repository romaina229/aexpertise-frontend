import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, BarChart3, Target, Briefcase,
  ArrowRight, CheckCircle 
} from 'lucide-react'

const services = [
  {
    icon: Users,
    title: 'Renforcement des capacités',
    description: 'Des formations sur mesure pour développer les compétences de vos équipes.',
    features: [
      'Formation en présentiel et à distance',
      'Modules personnalisés selon vos besoins',
      'Suivi et évaluation des acquis',
      'Certification des compétences'
    ],
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop'
  },
  {
    icon: BarChart3,
    title: 'Digitalisation des données',
    description: 'Optimisez votre collecte et analyse de données avec des outils digitaux.',
    features: [
      'Solutions de collecte mobile',
      'Tableaux de bord personnalisés',
      'Analyse avancée des données',
      'Formation aux outils digitaux'
    ],
    color: 'from-green-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  },
  {
    icon: Target,
    title: 'Gestion de projets',
    description: 'Méthodologies agiles pour une gestion de projet efficace.',
    features: [
      'Méthodologie Agile et Scrum',
      'Outils de suivi de projet',
      'Gestion des risques',
      'Reporting et communication'
    ],
    color: 'from-purple-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop'
  },
  {
    icon: Briefcase,
    title: 'Consulting stratégique',
    description: 'Accompagnement personnalisé pour vos projets stratégiques.',
    features: [
      'Diagnostic organisationnel',
      'Planification stratégique',
      'Optimisation des processus',
      'Conduite du changement'
    ],
    color: 'from-orange-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
  }
]

export default function Services() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos services</h1>
            <p className="text-xl text-gray-200">
              Des solutions complètes pour répondre à tous vos besoins de formation et de conseil
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  >
                    Demander un devis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6 bg-white">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Service {index + 1}</span>
                        <span className="text-primary font-semibold">En savoir plus →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à transformer vos projets ?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
            >
              Nous contacter
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
