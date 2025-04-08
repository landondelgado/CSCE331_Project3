// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Menu from './Menu';
import MenuPOS from './MenuPOS';
import Analytics from './analytics'; 
import InventoryPage from './InventoryPage'; 

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '628707446498-mhfk672u8s747d10nkrbi88ccnkd1oa9.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menupos" element={<MenuPOS />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;