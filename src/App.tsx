import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BondConversionTool from './pages/BondConversionTool';
import RecipeBuilder from './pages/RecipeBuilder';
import './App.css';  // Include this if you have custom styles

const App: React.FC = () => {
  return (
    <Router basename="/flipping-tracker">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/flipping-tracker/" replace />} />
        <Route path="/flipping-tracker/" element={<Home />} />
        <Route path="/bond-conversion/" element={<BondConversionTool />} />
        <Route path="/recipe-builder/" element={<RecipeBuilder />} />
        <Route path="*" element={<Navigate to="/flipping-tracker/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
