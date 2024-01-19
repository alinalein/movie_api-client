import { MovieCard } from '../movie-card/movie-card';
import { Col } from "react-bootstrap"

export const MoviesCrime = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Crime');

    return (
        <div>
            <h2>Crime Movies</h2>
            <p>Crime films are a genre of film that focus on crime.</p>
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


