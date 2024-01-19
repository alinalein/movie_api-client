import { MovieCard } from '../movie-card/movie-card';
import { Col } from "react-bootstrap"

export const MoviesAction = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Action');

    return (
        <div>
            <h2>Action Movies</h2>
            <p>'Action films are a genre that typically involves a protagonist who is in a race against time, their own abilities, or other external forces.</p>
            <ul>
                {dramaMovies.map(movie => (
                    <Col className="mb-5" key={movie.id} >
                        <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                    </Col>
                ))}
            </ul>
        </div>
    );
};


