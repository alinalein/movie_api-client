import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SearchMovie } from "../search-movie/search-movie"
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { UserProfile } from "../profile-view/user-profile";
import { EditProfile } from "../profile-view/edit-profile";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";
import { DeleteProfile } from "../profile-view/delete-profile";
import { MoviesDrama } from "../movies-genre/drama-genre";
import { MoviesAction } from "../movies-genre/action-genre";
import { MoviesBiography } from "../movies-genre/biography-genre";
import { MoviesCrime } from "../movies-genre/crime-genre";
import { MoviesSciFi } from "../movies-genre/sci-fi-genre";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    const storedToken = localStorage.getItem("token");
    //Create state variable, called user with initial stale "null". Use to check if user is logged in or not.
    const [user, setUser] = useState(storedUser ? storedUser : null);
    //Create state variable, called token with initial state "null". Use to store token.
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    // handle state of scroll up button-> route /
    const [showScrollButton, setShowScrollButton] = useState(false);
    useEffect(() => {
        setShowScrollButton(movies.length > 0);
    }, [movies]);


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
                                            <Col className="mb-4" key={movie.id} md={3} >
                                                <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                                            </Col>
                                        ))}
                                        {showScrollButton && (
                                            <Col className="mb-4" md={4} >
                                                <Button
                                                    variant="primary" className="scroll-button"
                                                    onClick={() => {
                                                        window.scrollTo(0, 0);
                                                    }}
                                                >
                                                    Scroll to Top
                                                </Button>
                                            </Col>
                                        )}
                                    </>
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
                                    <Col style={{ border: "2px solid green" }} >
                                        <MovieView movies={movies} user={user} token={token} setUser={setUser} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Route to the profile of the user  */}
                    <Route
                        path="/user-profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={5}>
                                        <UserProfile
                                            user={user}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Route to edit the profile */}
                    <Route
                        path="/edit-profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={5}>
                                        <EditProfile
                                            user={user}
                                            setUser={setUser}
                                            token={token}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Route to favorite movies */}
                    <Route
                        path="/favorite-movies"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <FavoriteMovies
                                            user={user}
                                            movies={movies}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    {/* Route to delete the profile */}
                    <Route
                        path="/delete-profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={5}>
                                        <DeleteProfile
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    />
                    {/* Route tom movie Genres */}
                    <Route
                        path="/drama"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col >
                                        <MoviesDrama
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    />
                    <Route
                        path="/crime"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col >
                                        <MoviesCrime
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    /><Route
                        path="/biography"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col >
                                        <MoviesBiography
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    /><Route
                        path="/sci-fi"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col >
                                        <MoviesSciFi
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    /><Route
                        path="/action"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col >
                                        <MoviesAction
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    />
                    <Route
                        path="/search"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col >
                                        <SearchMovie
                                            movies={movies}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }

                    />
                </Routes>
            </Row >
        </BrowserRouter>
    );
};