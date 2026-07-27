import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Formations from './pages/Formations'
import FormationDetail from './pages/FormationDetail'
import Ressources from './pages/Ressources'
import Contact from './pages/Contact'
import DemandeFormation from './pages/DemandeFormation'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/formations/:id" element={<FormationDetail />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demande-formation" element={<DemandeFormation />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App