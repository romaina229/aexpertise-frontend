import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  CalendarCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'

const menuItems = [
  { name: 'Tableau de bord', path: '/admin', icon: LayoutDashboard },
  { name: 'Formations', path: '/admin/formations', icon: BookOpen },
  { name: 'Inscriptions', path: '/admin/registrations', icon: Users },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Demandes de formation', path: '/admin/formation-requests', icon: CalendarCheck },
  { name: 'Paramètres', path: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-primary text-white`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-primary-light">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-bold">A+</span>
            {sidebarOpen && <span className="text-lg">Admin</span>}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-primary-light transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-accent text-white' 
                    : 'hover:bg-primary-light text-gray-200'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-primary-light">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-primary-light transition-colors text-gray-200"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Panel d'administration</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Administrateur</span>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
