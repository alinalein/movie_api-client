import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesAction = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Action');

    return (
        <Row className="justify-content-center" >
            <h2>Action Movies</h2>
            <p>'Action films are a genre that typically involves a protagonist who is in a race against time, their own abilities, or other external forces.</p>

            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3} >
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}
        </Row>


    );
};


