import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Kouassi',
    position: 'Directrice des Ressources Humaines',
    organization: 'ONG Espoir',
    content: 'La formation en gestion de projet a transformé notre manière de travailler. Nos équipes sont plus efficaces et mieux organisées.',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Marie+Kouassi&size=100&background=1a3c5e&color=fff'
  },
  {
    id: 2,
    name: 'Jean Mensah',
    position: 'Coordinateur de Projet',
    organization: 'Ministère de la Santé',
    content: 'Une expertise exceptionnelle dans la digitalisation des données. Notre système est maintenant plus fiable et plus rapide.',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Jean+Mensah&size=100&background=1a3c5e&color=fff'
  },
  {
    id: 3,
    name: 'Aminata Diallo',
    position: 'Chef de Projet',
    organization: 'Programme de Développement',
    content: 'Le consulting stratégique de Expertise A+ nous a permis d\'optimiser nos processus et d\'atteindre nos objectifs.',
    rating: 4,
    image: 'https://ui-avatars.com/api/?name=Aminata+Diallo&size=100&background=1a3c5e&color=fff'
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La satisfaction de nos partenaires est notre plus grande fierté
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-sm text-primary">
                    {testimonials[currentIndex].organization}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-accent fill-accent'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg text-gray-700 italic">
                "{testimonials[currentIndex].content}"
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
