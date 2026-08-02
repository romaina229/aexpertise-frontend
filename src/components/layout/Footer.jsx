import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const quickLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/about' },
  { name: 'Nos services', path: '/services' },
  { name: 'Formations', path: '/formations' },
  { name: 'Contact', path: '/contact' },
]

const socialLinks = [
  // { icon: Facebook, href: '#', label: 'Facebook' },
  // { icon: Twitter, href: '#', label: 'Twitter' },
  // { icon: Linkedin, href: '#', label: 'LinkedIn' },
  // { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Expertise A+</h3>
            <p className="text-gray-300 mb-4">
              Accompagnement des ONG, institutions et entreprises dans le renforcement des capacités et la digitalisation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Renforcement des capacités</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Digitalisation des données</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Gestion de projets</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Consulting stratégique</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-300">Abomey-Calavi, Zogbadjè, Bénin</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-gray-300">+229 0140152443</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-gray-300">expertisea@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Expertise A+. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/mentions-legales" className="text-gray-300 text-sm hover:text-accent transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-gray-300 text-sm hover:text-accent transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
