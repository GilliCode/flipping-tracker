import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-dark">
      <Container>
        <NavLink to="/" className="navbar-brand">Flipping Tracker</NavLink> {/* Corrected route */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/bond-conversion" className={({ isActive }) => isActive ? 'active' : ''}>Bond Conversion Tool</Nav.Link>
            <Nav.Link as={NavLink} to="/recipe-builder" className={({ isActive }) => isActive ? 'active' : ''}>Recipe Tool</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
