import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="display-4 fade-in">Welcome to the Flipping Tracker</h1>
      <p className="lead">Manage your trades efficiently. Select a tool below to get started.</p>
      <Button variant="primary" className="cta-button" onClick={() => navigate('/bond-conversion')}>
        Get Started
      </Button>
    </div>
  );
};

export default Home;
