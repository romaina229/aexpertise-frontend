import { motion } from 'framer-motion'
import { Users, Briefcase, Award, Calendar } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '150+',
    label: 'Professionnels formés',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Briefcase,
    value: '5+',
    label: 'Organisations accompagnées',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Award,
    value: '98%',
    label: 'Taux de satisfaction',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Calendar,
    value: '5+',
    label: "Années d'expérience",
    color: 'from-orange-500 to-orange-600'
  }
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mx-auto flex items-center justify-center mb-4`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
