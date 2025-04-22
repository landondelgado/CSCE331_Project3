//App.jsx
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import Menu from './Menu'
import MenuPOS from './MenuPOS'
import Analytics from './analytics'
import InventoryPage from './InventoryPage'

import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId =
  '628707446498-mhfk672u8s747d10nkrbi88ccnkd1oa9.apps.googleusercontent.com'

function App() {
  //brightness and contrast sliders
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* Controls */}
      <header className="p-4 bg-gray-100 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">🔆 Brightness</label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={e => setBrightness(+e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">⚫️ Contrast</label>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={e => setContrast(+e.target.value)}
          />
        </div>
      </header>

      {/* App content */}
      <div
        style={{
          filter: `brightness(${brightness}%) contrast(${contrast}%)`,
          transition: 'filter 0.2s',
        }}
        className="min-h-screen"
      >
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menupos" element={<MenuPOS />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
