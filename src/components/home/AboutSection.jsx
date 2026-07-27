import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle, Target, Users, Award } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque service que nous proposons.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Nous croyons en la force du travail d\'équipe et du partage.'
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'Nous intégrons les dernières innovations dans nos méthodes.'
  }
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              À propos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Nous sommes Expertise A+
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Depuis plus de 10 ans, nous accompagnons les organisations dans leur transformation et leur montée en compétences.
            </p>
            <p className="text-gray-600 mb-8">
              Notre approche combine expertise technique, pédagogie innovante et accompagnement personnalisé pour garantir des résultats concrets et durables.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Approche sur mesure</h4>
                  <p className="text-gray-600">Des solutions adaptées à vos besoins spécifiques</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Expertise reconnue</h4>
                  <p className="text-gray-600">Une équipe de professionnels expérimentés</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Résultats mesurables</h4>
                  <p className="text-gray-600">Des indicateurs de performance clairs</p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
            >
              En savoir plus
              <CheckCircle className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-bold text-gray-800">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
            <div className="col-span-2 bg-gradient-to-br from-primary to-primary-light text-white p-6 rounded-2xl shadow-lg text-center">
              <p className="text-sm font-semibold">Rejoignez plus de 500 professionnels formés</p>
              <p className="text-3xl font-bold mt-2">50+</p>
              <p className="text-sm">Organisations partenaires</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
