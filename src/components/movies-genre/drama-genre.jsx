import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesDrama = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Drama');

    return (
        <Row className="justify-content-center" style={{ border: "2px solid green" }}>
            <h2>Drama Movies</h2>
            <p>Drama is a category of narrative fiction intended to be more serious than humorous in tone.</p>

            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3}>
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}

        </Row>
    );
};


