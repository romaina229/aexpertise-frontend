import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  FileText, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  Scale,
  Gavel,
  Users,
  Globe,
  BookOpen,
  Award,
  CheckCircle
} from 'lucide-react'

export default function MentionsLegales() {
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
              <Scale className="h-8 w-8 text-accent" />
              <span className="text-accent font-semibold">Informations légales</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mentions Légales</h1>
            <p className="text-xl text-gray-200">
              Conformément aux dispositions légales, nous mettons à votre disposition les informations 
              relatives à notre société et à notre activité.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
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
              {/* Article 1 - Identification */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 1 : Identification de l'entreprise</h2>
                </div>
                <div className="space-y-3 text-gray-700 pl-9">
                  <p><strong>Raison sociale :</strong>  Expertise A+</p>
                  <p><strong>Forme juridique :</strong> Cabinet d'expertise et conseil (Ets)</p>
                  <p><strong>Capital social :</strong> 10 000 000 FCFA</p>
                  <p><strong>Registre du Commerce :</strong> RCCM n° RB/AB/2026/0...</p>
                  <p><strong>N° d'identification fiscale :</strong> .............</p>
                  <p><strong>N° de compte bancaire :</strong> ......</p>
                  <p><strong>Banque :</strong> ........</p>
                  <p><strong>Siège social :</strong> Abomey-Calavi, Zogbadjè, Bénin</p>
                </div>
              </div>

              {/* Article 2 - Directeur de publication */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 2 : Directeur de publication</h2>
                </div>
                <div className="space-y-3 text-gray-700 pl-9">
                  <p><strong>Nom :</strong> Jonas Towanou AGBOKO</p>
                  <p><strong>Fonction :</strong> Fondateur & Directeur Général</p>
                  <p><strong>Email :</strong> axpertise@gmail.com</p>
                  <p><strong>Téléphone :</strong> +229 01 40 15 24 43</p>
                  <p><strong>Qualification :</strong> Expert en gestion de projets, certifié PMP et Agile</p>
                  <p><strong>Expérience :</strong> Plus de 15 ans d'expérience dans le conseil et la formation</p>
                </div>
              </div>

              {/* Article 3 - Hébergement */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 3 : Hébergement du site</h2>
                </div>
                <div className="space-y-3 text-gray-700 pl-9">
                  <p><strong>Hébergeur :</strong> OVH SAS</p>
                  <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
                  <p><strong>Téléphone :</strong> +33 9 72 10 10 07</p>
                  <p><strong>Site web :</strong> https://www.ovh.com</p>
                  <p><strong>Capital social :</strong> 10 000 000 €</p>
                  <p><strong>RCS :</strong> Lille Métropole 424 761 419</p>
                  <p><strong>SIRET :</strong> 424 761 419 00045</p>
                  <p><strong>N° TVA :</strong> FR 22 424 761 419</p>
                </div>
              </div>

              {/* Article 4 - Propriété intellectuelle */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 4 : Propriété intellectuelle</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    L'ensemble des contenus présents sur le site À+ Expertise (textes, images, graphismes, 
                    logos, vidéos, icônes, etc.) est la propriété exclusive de À+ Expertise ou de ses 
                    partenaires et est protégé par les lois en vigueur sur la propriété intellectuelle.
                  </p>
                  <p>
                    <strong>Toute reproduction, représentation, modification, publication, adaptation</strong> 
                    de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
                    est interdite, sauf autorisation écrite préalable de À+ Expertise.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Sanctions légales :</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                      <li>Contrefaçon : 3 ans d'emprisonnement et 300 000 € d'amende</li>
                      <li>Atteinte aux droits d'auteur : 5 ans d'emprisonnement et 500 000 € d'amende</li>
                      <li>Usurpation de droits : 3 ans d'emprisonnement et 200 000 € d'amende</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Article 5 - Responsabilité */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 5 : Responsabilité</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    À+ Expertise s'efforce d'assurer l'exactitude et la mise à jour des informations 
                    diffusées sur ce site. Toutefois, nous ne pouvons garantir l'exhaustivité ou 
                    l'absence de modification par un tiers des informations présentes.
                  </p>
                  <p>
                    <strong>À+ Expertise ne saurait être tenue responsable :</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Des éventuelles erreurs ou omissions dans les informations diffusées</li>
                    <li>Des dommages résultant d'une intrusion frauduleuse d'un tiers</li>
                    <li>Des virus informatiques pouvant infecter votre matériel</li>
                    <li>De l'indisponibilité temporaire du site pour maintenance</li>
                  </ul>
                </div>
              </div>

              {/* Article 6 - Données personnelles */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 6 : Protection des données personnelles</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, 
                    de rectification, de modification et de suppression des données vous concernant.
                  </p>
                  <p>
                    <strong>Pour exercer ce droit :</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Par email : expertisea@gmail.com</li>
                    <li>Par courrier : Abomey-Calavi, Zogbadjè, Bénin</li>
                    <li>Via le formulaire de contact du site</li>
                  </ul>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <p className="text-sm text-gray-600">
                      <strong>Délai de réponse :</strong> 30 jours maximum à compter de la réception de la demande
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 7 - Cookies */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 7 : Utilisation des cookies</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Le site À+ Expertise utilise des cookies pour améliorer l'expérience utilisateur, 
                    analyser le trafic et personnaliser le contenu.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Cookies essentiels</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Authentification</li>
                        <li>Gestion de session</li>
                        <li>Sécurité</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Cookies analytiques</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Google Analytics</li>
                        <li>Statistiques de visite</li>
                        <li>Amélioration du site</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur.
                  </p>
                </div>
              </div>

              {/* Article 8 - Liens externes */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 8 : Liens externes</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Le site peut contenir des liens vers d'autres sites web. À+ Expertise n'exerce 
                    aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Avertissement :</strong> Les liens externes sont fournis à titre indicatif. 
                      Nous vous recommandons de vérifier les politiques de confidentialité de ces sites 
                      avant de fournir des données personnelles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Article 9 - Droit applicable */}
              <div className="mb-10 border-t pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Article 9 : Droit applicable</h2>
                </div>
                <div className="space-y-4 text-gray-700 pl-9">
                  <p>
                    Les présentes mentions légales sont régies par le droit béninois. Tout litige 
                    relatif à l'utilisation du site sera soumis à la compétence exclusive des 
                    tribunaux de Cotonou, Bénin.
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <p className="text-sm text-gray-600">
                      <strong>Conformité :</strong> Notre site est conforme aux dispositions de :
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                      <li>La loi OHADA sur les sociétés commerciales</li>
                      <li>La loi béninoise sur la protection des données</li>
                      <li>Le règlement général sur la protection des données (RGPD)</li>
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
                <div className="space-y-3 text-gray-700 pl-9">
                  <p><strong>Adresse :</strong> Abomey-Calavi, Zogbaadjè, Bénin</p>
                  <p><strong>Téléphone :</strong> +229 01 40 15 24 43</p>
                  <p><strong>Email :</strong> aexpertise@gmail.com</p>
                  <p><strong>Horaires :</strong> Lundi - Vendredi, 08h00 - 18h00</p>
                  <div className="mt-4 flex gap-4">
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
