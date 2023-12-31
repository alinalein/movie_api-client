import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    useEffect(() => {
        let storedUser;
        try {
            storedUser = JSON.parse(localStorage.getItem("user")) || {};
        } catch (error) {
            console.error("Error parsing stored user data:", error);
            storedUser = {};
        }
        console.log("Stored User:", storedUser);
    }, []);

    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
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

    if (!user) {
        return (
            <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }}
            />
        )
    }
    const getsimilarMovies = (selectedMovie, allMovies) => {
        return allMovies.filter(movie => movie.Genre === selectedMovie.Genre && movie.id !== selectedMovie.id)
    }
    if (selectedMovie) {
        /* call the getsimilarMovies function from above*/
        const similarMovies = getsimilarMovies(selectedMovie, movies)
        return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                <hr />
                <h2>Movies with the same Genre:</h2>
                <div>
                    {/* Apply the map function to every movie that matches the specified conditions in the array. */}
                    {similarMovies.map((similarMovie) => (
                        <MovieCard
                            key={similarMovie.id}
                            movie={similarMovie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie)
                            }}
                        />
                    ))}
                    <br />
                    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

                </div>
            </>
        )
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <br />
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
};