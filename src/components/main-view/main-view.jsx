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
    const [selectedMovie, setSelectedMovie] = useState(null);

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


    const getsimilarMovies = (selectedMovie, allMovies) => {
        return allMovies.filter(movie => movie.Genre === selectedMovie.Genre && movie.id !== selectedMovie.id)
    }
    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid green " }}>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                    <hr />
                    <h2>Movies with the same Genre:</h2>
                    <div>
                        {getsimilarMovies(selectedMovie, movies).map((similarMovie) => (
                            <MovieCard
                                key={similarMovie.id}
                                movie={similarMovie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        ))}
                        <br />
                        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                    </div>
                </Col>
            ) : movies.length === 0 ? (

                <div>The list is empty</div>
            ) : (
                <>
                    < button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))
                    }
                </>
            )}
        </Row >
    );
};