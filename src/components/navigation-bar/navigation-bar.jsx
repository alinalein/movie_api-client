import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Search } from 'react-bootstrap-icons'
import './navigation-bar.scss'

export const NavigationBar = ({ user, onLoggedOut }) => {

  return (
    <Navbar sticky="top" data-bs-theme="dark" expand="lg" style={{ padding: '0px' }}>
      <Container style={{ background: 'black' }} className="nav__container">
        <Navbar.Brand as={Link} to="/">
          <span className="logo">myFlix</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* when user not logged in show this nav bar  */}
            {!user && (
              <>
                {/* The links to have to match the paths in main-view */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {/* when user loggen in show this bar  */}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/favorite-movies">
                  My List
                </Nav.Link>
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/crime">
                    Crime
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/biography">
                    Biography
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/sci-fi">
                    Sci-Fi
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/action">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/drama">
                    Drama
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/search">
                  Search <Search color="white" size={15} />
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Nav className="ml-auto">
              <NavDropdown title="Your Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user-profile">
                  User Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/edit-profile">
                  Edit Profile
                </NavDropdown.Item>
                {/* like under Edit Profile */}
                <hr className="dropdown-divider" />
                <NavDropdown.Item as={Link} to="/delete-profile">
                  Delete Profile
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
