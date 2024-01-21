import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from "react-bootstrap"

export const MoviesCrime = ({ movies, token, user, setUser }) => {
    // Filter movies with the genre "Drama"

    const dramaMovies = movies.filter(movie => movie.Genre === 'Crime');

    return (
        <Row className="justify-content-center" style={{ border: "2px solid green" }}>
            <h2>Crime Movies</h2>
            <p>Crime films are a genre of film that focus on crime.</p>

            {dramaMovies.map(movie => (
                <Col className="mb-3" key={movie.id} md={3} >
                    <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}

        </Row>
    );
};


