import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import Login from './pages/Login'

// Pages publiques
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Formations from './pages/Formations'
import FormationDetail from './pages/FormationDetail'
import Ressources from './pages/Ressources'
import Contact from './pages/Contact'
import DemandeFormation from './pages/DemandeFormation'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

// Pages admin
import Dashboard from './pages/admin/Dashboard'
import AdminFormations from './pages/admin/Formations'
import AdminRegistrations from './pages/admin/Registrations'
import AdminMessages from './pages/admin/Messages'
import AdminFormationRequests from './pages/admin/FormationRequests'
import Settings from './pages/admin/Settings'

// Protéger les routes admin
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Remonte en haut de page à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/formations" element={<Layout><Formations /></Layout>} />
        <Route path="/formations/:id" element={<Layout><FormationDetail /></Layout>} />
        <Route path="/ressources" element={<Layout><Ressources /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/demande-formation" element={<Layout><DemandeFormation /></Layout>} />
        <Route path="/mentions-legales" element={<Layout><MentionsLegales /></Layout>} />
        <Route path="/politique-confidentialite" element={<Layout><PolitiqueConfidentialite /></Layout>} />
        
        {/* Route de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Routes admin protégées */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="formations" element={<AdminFormations />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="formation-requests" element={<AdminFormationRequests />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirection 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App