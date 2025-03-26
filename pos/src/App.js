// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Menu from './Menu';
import MenuPOS from './MenuPOS'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menupos" element={<MenuPOS />} />
      </Routes>
    </Router>
  );
}

export default App;