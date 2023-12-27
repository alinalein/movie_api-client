import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movie-api-lina-834bc70d6952.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: movie.Genre.Name,
                        Director: movie.Director.Name,
                        Actors: movie.Actors,
                        ImagePath: movie.ImagePath,
                        Featured: movie.Featured
                    };
                });
                setMovies(moviesFromApi);
            })
    }, []);


    const getsimilarMovies = (selectedMovie, allMovies) => {
        return allMovies.filter(movie => movie.Genre === selectedMovie.Genre && movie.id !== selectedMovie.id)
    }
    if (selectedMovie) {
        const similarMovies = getsimilarMovies(selectedMovie, movies)
        return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                <hr />
                <h2>Movies with the same Genre:</h2>
                <div>
                    {similarMovies.map((similarMovie) => (
                        <MovieCard
                            key={similarMovie.id}
                            movie={similarMovie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie)
                            }}
                        />
                    ))}
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

        </div>
    );
};