import { MovieCard } from '../movie-card/movie-card';
import { Col } from "react-bootstrap"

export const MoviesBiography = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Biography');

    return (
        <div>
            <h2>Biography Movies</h2>
            <p>Biographical films are a genre that depicts the life of a notable person, real or imagined.</p>
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


