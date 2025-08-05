import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

interface NavigationItem {
  name: string
  path: string
  icon: React.ComponentType<{ size?: number }>
}

const Sidebar = ({ isCollapsed: propIsCollapsed, onToggle }: SidebarProps): React.JSX.Element => {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState<boolean>(false)
  const location = useLocation()
  
  // Use prop if provided, otherwise use internal state
  const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : internalIsCollapsed
  const toggleCollapsed = onToggle || (() => setInternalIsCollapsed(!internalIsCollapsed))

  const navigationItems: NavigationItem[] = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Evaluations', path: '/evaluations', icon: ClipboardList },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const isActive = (path: string): boolean => {
    return location.pathname === path
  }

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => onToggle ? onToggle() : setInternalIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-slate-900 text-white z-50 transition-all duration-300 ${
        isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'w-64'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">IS</span>
              </div>
              <div>
                <h2 className="font-semibold text-white">Industry Supervisor</h2>
                <p className="text-sm text-slate-400">Dashboard</p>
              </div>
            </div>
          )}
          
          <button
            onClick={toggleCollapsed}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors lg:hidden"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    onClick={() => window.innerWidth < 1024 && (onToggle ? onToggle() : setInternalIsCollapsed(true))}
                  >
                    <Icon size={20} />
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="flex items-center space-x-3 w-full px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Toggle button for desktop */}
      <button
        onClick={toggleCollapsed}
        className="fixed top-4 left-4 z-30 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors hidden lg:block"
      >
        <Menu size={20} />
      </button>
    </>
  )
}

export default Sidebar

