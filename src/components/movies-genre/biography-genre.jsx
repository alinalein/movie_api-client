import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesBiography = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Biography');

    return (
        <Row className="justify-content-center text-center" >
            <div>
                <h2 className="mb-2">Biography Movies</h2>
                <p className="mb-4">
                    Biographical films vividly portray captivating life stories, achievements, and legacies, offering an engaging cinematic experience.
                </p>
            </div>
            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3} sm={6} xs={12}>
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}

        </Row>
    );
};


