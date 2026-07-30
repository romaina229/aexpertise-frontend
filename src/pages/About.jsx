import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Lightbulb, Heart, Users, CheckCircle, ArrowRight } from 'lucide-react'

const teamMembers = [
  {
    name: 'Jonas T. AGBOKO',
    position: 'Fondateur & Directeur',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQFyZ2h5HOuiVg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721505256284?e=1787184000&v=beta&t=5KbwvvEj_kXAZQnwEbpMC-jXLTsSBBW8ZFhOueRIE-M'
  },
  {
    name: 'Faustin GNANGUENON',
    position: 'Directeur Pédagogique',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQFk5t-ce63V8Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694738502870?e=1787184000&v=beta&t=qYHvT6EPM5odPoY-vWYUvqk4UM_li0REOCybXjET1Hk'
  },
  {
    name: 'Romain AKPO',
    position: 'Expert en Digitalisation',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQGLAUD4g99L-A/profile-displayphoto-scale_400_400/B4EZ91WzKEIsAg-/0/1784380343544?e=1787184000&v=beta&t=473WRJt7dUqY2FagUvRQnIPLif3dhYhPmx_CAlo4zq4'
  },
  {
    name: 'Raphaël T. SOKE',
    position: 'Consultante Senior',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQEoLQ7uyvbSdg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1667162514265?e=1787184000&v=beta&t=6iUKGwLn3CcSRZFlH_f46iIAJ_1ZoxohyJTtWWQq8CY'
  }
]

const values = [
  {
    icon: Target,
    title: 'Notre Mission',
    description: 'Renforcer les capacités des organisations pour leur permettre d\'atteindre leurs objectifs de développement.'
  },
  {
    icon: Lightbulb,
    title: 'Notre Vision',
    description: 'Être le partenaire de référence pour la formation et le conseil en Afrique francophone.'
  },
  {
    icon: Heart,
    title: 'Nos Valeurs',
    description: 'Excellence, intégrité, innovation et engagement pour la satisfaction de nos clients.'
  }
]

export default function About() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de nous</h1>
            <p className="text-xl text-gray-200">
              Depuis plus de 5 ans, nous accompagnons les organisations dans leur transformation et leur montée en compétences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Valeurs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 2022, Expertise A+ est née de la volonté de répondre aux besoins croissants des organisations en matière de renforcement des capacités et de digitalisation.
                </p>
                <p>
                  Depuis notre création, nous avons accompagné plus de 3 organisations dans divers secteurs : ONG, institutions publiques, entreprises privées et programmes de développement.
                </p>
                <p>
                  Notre approche combine l'expertise technique, la pédagogie innovante et l'accompagnement personnalisé pour garantir des résultats concrets et durables.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <span className="text-3xl font-bold text-accent">5+</span>
                  <p className="text-sm text-gray-500">Années d'expertise</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-accent">150+</span>
                  <p className="text-sm text-gray-500">Professionnels formés</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-accent">3+</span>
                  <p className="text-sm text-gray-500">Organisations partenaires</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8"
            >
              <div className="aspect-video bg-white rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">🚀</span>
                  <h3 className="text-xl font-bold text-primary">5 ans d'innovation</h3>
                  <p className="text-gray-500">Au service de votre réussite</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des experts passionnés au service de votre réussite
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary/10 group-hover:border-primary/30 transition-colors"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                <p className="text-primary font-medium">{member.position}</p>
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
              Rejoignez nos partenaires
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Ensemble, construisons des projets durables et transformateurs
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
