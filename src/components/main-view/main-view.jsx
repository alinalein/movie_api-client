import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    const storedToken = localStorage.getItem("token");
    //Create state variable, called user with initial stale "null". Use to check if user is logged in or not.
    const [user, setUser] = useState(storedUser ? storedUser : null);
    //Create state variable, called token with initial state "null". Use to store token.
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    /*populate the movies array with the movies from the API */
    useEffect(() => {

        if (!token) {
            return;
        }
        fetch("https://movie-api-lina-834bc70d6952.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    const featutedStatus = movie.Featured ? 'Yes' : 'No';
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: movie.Genre.Name,
                        Director: movie.Director.Name,
                        Actors: movie.Actors.join(', '),
                        ImagePath: movie.ImagePath,
                        Featured: featutedStatus
                    };
                });
                setMovies(moviesFromApi);
            })
    }, [token]);

    return (
        <BrowserRouter>
            {/* Call NavivationBar component & send the props */}
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null); setToken(null); localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    {/* Route to register */}
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}

                            </>
                        }
                    />
                    {/* Route to login */}
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }}
                                        />

                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Route to selected movie  */}
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    // send the movies array to MovieView
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Route to show all movies  */}
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (

                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row >
        </BrowserRouter>
    );
};