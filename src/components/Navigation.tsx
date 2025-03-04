import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
          Flipping Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/bond-conversion/" className="nav-link">
              Bond Conversion Tool
            </Nav.Link>
            <Nav.Link as={NavLink} to="/recipe-builder/" className="nav-link">
              Recipe Tool
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
