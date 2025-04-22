// App.js
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Menu from './Menu';
import MenuPOS from './MenuPOS';
import Analytics from './analytics';
import InventoryPage from './InventoryPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '628707446498-mhfk672u8s747d10nkrbi88ccnkd1oa9.apps.googleusercontent.com';

// Visibility Context
export const VisibilityContext = createContext();
export const useVisibility = () => useContext(VisibilityContext);

function App() {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [showControls, setShowControls] = useState(false); // ✅ Needed in context

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <VisibilityContext.Provider
        value={{
          brightness,
          contrast,
          setBrightness,
          setContrast,
          showControls,
          setShowControls, // ✅ Now available globally
        }}
      >
        <div
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
            transition: 'filter 0.2s',
          }}
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
      </VisibilityContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
