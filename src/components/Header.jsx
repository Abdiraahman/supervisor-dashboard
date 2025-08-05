import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  
  const getPageTitle = () => {
    const path = location.pathname
    switch (path) {
      case '/':
        return 'Dashboard'
      case '/students':
        return 'Students'
      case '/evaluations':
        return 'Evaluations'
      case '/messages':
        return 'Messages'
      case '/settings':
        return 'Settings'
      case '/update-profile':
        return 'Update Profile'
      default:
        return 'Dashboard'
    }
  }

  const getWelcomeMessage = () => {
    const title = getPageTitle()
    if (title === 'Dashboard') {
      return 'Welcome, Industry Supervisor!'
    }
    return ''
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
          {getWelcomeMessage() && (
            <p className="text-sm text-gray-600 mt-1">{getWelcomeMessage()}</p>
          )}
        </div>

        {/* Right side - Search, Notifications, and Avatar */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">IS</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Industry Supervisor</p>
              <p className="text-xs text-gray-500">supervisor@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

