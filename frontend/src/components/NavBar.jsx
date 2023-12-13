import React from 'react';
import { Navbar, Nav, Container, Button, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { api } from "../utilities";  

const NavBar = ({ user, setUser }) => {
  const logOut = async () => {
    let response = await api.post("logout/");
    if (response.status === 204) {
      setUser(null);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">LeagueManager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
          </Nav>
          {user ? (
            <>
              <Nav.Link as={Link} to="/contact">Contacts</Nav.Link>
              <Button onClick={logOut} variant="danger">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline-success">Login</Button>
              <Button as={Link} to="/register" variant="success" style={{ marginLeft: '10px' }}>Sign Up</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
