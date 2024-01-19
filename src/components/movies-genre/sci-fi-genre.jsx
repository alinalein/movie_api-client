import { MovieCard } from '../movie-card/movie-card';
import { Col } from "react-bootstrap"

export const MoviesSciFi = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Sci-Fi');

    return (
        <div>
            <h2>Sci-Fi Movies</h2>
            <p>Science fiction is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'</p>
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


