import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesSciFi = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Sci-Fi');

    return (
        <Row className="justify-content-center">
            <h2>Sci-Fi Movies</h2>
            <p>Science fiction is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'</p>

            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3} >
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}

        </Row>
    );
};


