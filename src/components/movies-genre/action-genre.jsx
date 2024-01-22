import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesAction = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Action');

    return (
        <Row className="justify-content-center text-center" >
            <div>
                <h2 className="mb-2">Action Movies</h2>
                <p className="mb-4">'Action films are a genre that typically involves a protagonist who is in a race against time, their own abilities, or other external forces.</p>
            </div>
            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3} >
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}
        </Row>
    );
};


