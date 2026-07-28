import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Lock, 
  User, 
  Mail, 
  Database,
  Eye,
  FileText,
  CheckCircle,
  AlertTriangle,
  Key,
  Bell,
  Clock,
  Globe,
  Users,
  Trash2,
  Archive,
  RefreshCw
} from 'lucide-react'

export default function PolitiqueConfidentialite() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-accent font-semibold">Protection des données</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Politique de Confidentialité</h1>
            <p className="text-xl text-gray-200">
              Nous accordons une importance primordiale à la protection de vos données personnelles. 
              Découvrez comment nous les collectons, utilisons et protégeons.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              Version : 1.0 - Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              {/* Introduction */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Introduction</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    <strong>Expertise A+ </strong> (ci-après "nous", "notre" ou "nos") s'engage à protéger 
                    la vie privée et les données personnelles de nos utilisateurs. Cette politique de 
                    confidentialité explique comment nous collectons, utilisons, partageons et protégeons 
                    vos informations lorsque vous utilisez notre site web et nos services.
                  </p>
                  <p>
                    En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. 
                    Si vous n'êtes pas d'accord avec ces pratiques, veuillez ne pas utiliser notre site.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>🔒 Engagement :</strong> Nous nous engageons à respecter la confidentialité 
                      de vos données et à les protéger conformément aux lois en vigueur.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 1 - Données collectées */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 1 : Données personnelles collectées</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>Nous collectons les données suivantes lorsque vous utilisez notre site :</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Données d'identification
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Nom et prénom</li>
                        <li>Adresse email</li>
                        <li>Numéro de téléphone</li>
                        <li>Organisation/Entreprise</li>
                        <li>Poste occupé</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        Données de navigation
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Adresse IP</li>
                        <li>Type de navigateur</li>
                        <li>Pages visitées</li>
                        <li>Durée de visite</li>
                        <li>Source de trafic</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Données de contact
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                      <li>Messages envoyés via le formulaire de contact</li>
                      <li>Demandes de formation</li>
                      <li>Inscriptions aux formations</li>
                      <li>Commentaires et retours</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Article 2 - Utilisation des données */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 2 : Utilisation de vos données</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>Vos données sont utilisées pour les finalités suivantes :</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Gestion des demandes :</strong> Traitement de vos demandes de contact et de formation</li>
                    <li><strong>Inscriptions :</strong> Gestion de vos inscriptions aux formations</li>
                    <li><strong>Communication :</strong> Envoi d'informations sur nos services</li>
                    <li><strong>Amélioration :</strong> Analyse de l'utilisation du site pour l'améliorer</li>
                    <li><strong>Personnalisation :</strong> Adaptation de notre offre à vos besoins</li>
                    <li><strong>Sécurité :</strong> Protection contre les fraudes et les abus</li>
                  </ul>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>✅ Base légale :</strong> Nous traitons vos données sur la base de votre 
                      consentement, de l'exécution de nos services et de nos obligations légales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 3 - Partage des données */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 3 : Partage des données</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Nous ne partageons vos données personnelles qu'avec les tiers suivants, 
                    dans le strict respect de la confidentialité :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Prestataires techniques</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Hébergeur (OVH)</li>
                        <li>Services de messagerie</li>
                        <li>Outil de paiement sécurisé</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Services analytiques</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Google Analytics</li>
                        <li>Statistiques internes</li>
                        <li>Outils de mesure</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Engagement :</strong> Nous ne vendons jamais vos données personnelles 
                      à des tiers. Tous nos partenaires respectent la confidentialité des données.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 4 - Sécurité des données */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 4 : Sécurité des données</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800">Chiffrement</h4>
                      <p className="text-sm text-gray-600">SSL/TLS pour toutes les communications</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Key className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800">Authentification</h4>
                      <p className="text-sm text-gray-600">Accès sécurisé et contrôlé</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800">Sauvegarde</h4>
                      <p className="text-sm text-gray-600">Sauvegardes régulières et sécurisées</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Chiffrement des données sensibles</li>
                    <li>Protection contre les attaques DDoS</li>
                    <li>Mise à jour régulière des systèmes</li>
                    <li>Contrôle d'accès strict</li>
                    <li>Journalisation des accès</li>
                  </ul>
                </div>
              </div>

              {/* Article 5 - Droits des utilisateurs */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 5 : Vos droits</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>Conformément à la réglementation, vous disposez des droits suivants :</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Droit d'accès</h4>
                      <p className="text-sm text-gray-600">Obtenir une copie de vos données</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Droit de rectification</h4>
                      <p className="text-sm text-gray-600">Corriger vos données inexactes</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Droit d'opposition</h4>
                      <p className="text-sm text-gray-600">Refuser l'utilisation de vos données</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Droit à l'oubli</h4>
                      <p className="text-sm text-gray-600">Demander la suppression de vos données</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Droit de portabilité</h4>
                      <p className="text-sm text-gray-600">Récupérer vos données dans un format lisible</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Droit de retrait</h4>
                      <p className="text-sm text-gray-600">Retirer votre consentement à tout moment</p>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <p className="text-sm text-gray-600">
                      <strong>Comment exercer vos droits :</strong> Envoyez-nous un email à 
                      contact@aaexpertise.com ou un courrier à notre adresse.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 6 - Conservation des données */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Archive className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 6 : Conservation des données</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Durée de conservation</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Données de contact : 3 ans</li>
                        <li>Historique des demandes : 5 ans</li>
                        <li>Inscriptions : 5 ans</li>
                        <li>Données analytiques : 2 ans</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Suppression</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>À votre demande</li>
                        <li>À expiration du délai</li>
                        <li>Si les données ne sont plus nécessaires</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Certaines données peuvent être conservées plus longtemps pour respecter 
                    nos obligations légales ou réglementaires.
                  </p>
                </div>
              </div>

              {/* Article 7 - Cookies */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 7 : Politique des cookies</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>Nous utilisons différents types de cookies :</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Cookies essentiels</h4>
                      <p className="text-sm text-gray-600">
                        Nécessaires au fonctionnement du site (authentification, session, sécurité).
                        Ils ne peuvent pas être désactivés.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Cookies de performance</h4>
                      <p className="text-sm text-gray-600">
                        Nous permettent d'analyser l'utilisation du site pour l'améliorer 
                        (Google Analytics).
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Cookies de fonctionnalité</h4>
                      <p className="text-sm text-gray-600">
                        Mémorisent vos préférences et personnalisent votre expérience.
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Gestion des cookies :</strong> Vous pouvez gérer vos préférences 
                      directement dans les paramètres de votre navigateur.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 8 - Transferts internationaux */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 8 : Transferts internationaux</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Vos données peuvent être transférées vers des pays hors de votre pays de résidence 
                    pour les besoins de nos services (hébergement, maintenance). Nous nous assurons 
                    que ces transferts respectent les lois applicables.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Garantie :</strong> Tous nos partenaires s'engagent à respecter les mêmes 
                      niveaux de protection que ceux exigés par la réglementation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 9 - Modifications */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 9 : Modifications de la politique</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Nous pouvons mettre à jour cette politique de confidentialité. Toute modification 
                    sera publiée sur cette page avec la date de mise à jour. Nous vous encourageons 
                    à consulter régulièrement cette page.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Historique des versions</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                      <li>Version 1.0 - {new Date().toLocaleDateString('fr-FR')} - Version initiale</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Article 10 - Contact */}
              <div className="border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 10 : Nous contacter</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou pour 
                    exercer vos droits, veuillez nous contacter :
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Expertise A+</strong></p>
                    <p>Abomey-Calavi, Zogbaadjè, Bénin</p>
                    <p>Cotonou, Bénin</p>
                    <p className="mt-2">
                      <strong>Email :</strong> aexpertise@gmail.com
                    </p>
                    <p>
                      <strong>Téléphone :</strong> +229 01 40 15 24 43
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Nous écrire
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                    >
                      Retour à l'accueil
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
