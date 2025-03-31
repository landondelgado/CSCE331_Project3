// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Menu from './Menu';
import MenuPOS from './MenuPOS'
import Analytics from './analytics'; 
import InventoryPage from './InventoryPage'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menupos" element={<MenuPOS />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;