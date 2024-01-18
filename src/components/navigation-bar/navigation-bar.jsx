import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    FilmPulse
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <NavDropdown title="Your Profile" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/user-profile">
                                        User Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/edit-profile">
                                        Edit Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/favorite-movies">
                                        Favorite Movies
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
