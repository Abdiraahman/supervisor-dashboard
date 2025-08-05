import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Evaluations from './pages/Evaluations'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import UpdateProfile from './pages/UpdateProfile'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Update Profile route (standalone, no layout) */}
        <Route path="/update-profile" element={<UpdateProfile />} />
        
        {/* Main application routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="evaluations" element={<Evaluations />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
