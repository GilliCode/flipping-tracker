import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BondConversionTool from './pages/BondConversionTool';
import RecipeBuilder from './pages/RecipeBuilder';
import './App.css';  // Include this if you have custom styles

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home loads first */}
        <Route path="/bond-conversion" element={<BondConversionTool />} />
        <Route path="/recipe-builder" element={<RecipeBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;