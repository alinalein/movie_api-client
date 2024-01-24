import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"
import "./movies-gerne.scss"

export const MoviesDrama = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Drama');

    return (
        <Row className="justify-content-center text-center" >
            <Row className='genre__header mb-4'>
                <h2 className="mb-2 h2__text-gerne">Drama Movies</h2>
                <p >
                    Drama movies dive into the complexities of human emotions and relationships, filled with real-life depth and resonance.
                </p>
            </Row>
            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3} sm={6} xs={12}>
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}

        </Row>
    );
};


