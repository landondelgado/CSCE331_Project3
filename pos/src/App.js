// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Menu from './Menu';
import MenuPOS from './MenuPOS'
import Analytics from './analytics'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menupos" element={<MenuPOS />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;