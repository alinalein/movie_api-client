import { MovieCard } from '../movie-card/movie-card';
import { Col } from "react-bootstrap"

export const MoviesDrama = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Drama');

    return (
        <div>
            <h2>Drama Movies</h2>
            <p>Drama is a category of narrative fiction intended to be more serious than humorous in tone.</p>
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


