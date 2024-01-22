import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesCrime = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Crime');

    return (
        <Row className="justify-content-center text-center">
            <div className='div__header mb-4'>
                <h2 className="mb-2 h2__text-gerne">Crime Movies</h2>
                <p>
                    Crime films promise a thrilling experience with suspenseful plots, mysterious twists, and a captivating exploration of criminal activities and investigations.
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

