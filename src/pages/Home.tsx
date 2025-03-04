import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import '../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="background-image"></div> {/* Uses FUL.png from public folder */}
      <div className="home-container">
        <div className="home-content">
          <h1 className="display-4 fade-in">Welcome to the Flipping Tracker</h1>
          <p className="lead">Manage your trades efficiently. Select a tool below to get started.</p>
          <Button variant="primary" className="cta-button" onClick={() => navigate('/bond-conversion')}>
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
