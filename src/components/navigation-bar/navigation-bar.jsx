import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {

    const SearchIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
    )

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ fontSize: '3.5 rem' }}>
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
                                <Nav.Link as={Link} to="/search">
                                    Search <SearchIcon />
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
    );
};
