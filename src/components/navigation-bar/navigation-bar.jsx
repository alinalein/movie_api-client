import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    myFlix
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
                                <Nav.Link as={Link} to="/favorite-movies">
                                    My Movie List
                                </Nav.Link>
                                <NavDropdown title="Genres" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/crime">Crime</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/biography">Biography</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/sci-fi">Sci-Fi</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/action">Action</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/drama">Drama</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/">
                                    Search
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
    );
};
