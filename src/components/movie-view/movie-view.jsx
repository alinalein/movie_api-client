import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import { useParams } from "react-router";
import { Button, Col, Card, Row } from "react-bootstrap";

export const MovieView = ({ movies }) => {
    // only access the param from the before set path (here in main)
    const { movieId } = useParams();

    // got the whole movies array from main->here look for specific movie user klicked on by id-> then show details about this movie
    const movie = movies.find((m) => m.id === movieId);

    const findSimilarMovies = () => {
        return movies.filter((m) => m.Genre === movie.Genre && m.id !== movie.id);
    };
    const similarMovies = findSimilarMovies();

    return (
        <>
            <div>
                <div>
                    <img className="movie-image" src={movie.ImagePath} alt={movie.Title} />
                </div>
                <div>

                </div>
                <div>
                    <span> Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div>
                    <span> Genre: </span>
                    <span>{movie.Genre}</span>
                </div>
                <div>
                    <span> Director: </span>
                    <span>{movie.Director}</span>
                </div>
                <div>
                    <span> Actors: </span>
                    <span>{movie.Actors}</span>
                </div>
                <div>
                    <span> Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <div>
                    <Link to={`/`}>
                        <button >Go Back</button>
                    </Link>
                </div>
            </div>
            <br />

            <Row className="justify-content-md-center">
                {similarMovies.length > 0 && (
                    <>
                        <h2>Similar movies</h2>
                        {similarMovies.map((similarMovie) => (
                            <Col md={2} key={similarMovie.id}>
                                <Card className="h-100">
                                    <Card.Img variant="top" src={similarMovie.ImagePath} />
                                    <Card.Body>
                                        <Card.Title>{similarMovie.Title}</Card.Title>

                                        <Link to={`/movies/${similarMovie.id}`}>
                                            <Button variant="link">View Details</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </>
                )}
            </Row>
        </>
    )
}

MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.string.isRequired,
            Director: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
            Actors: PropTypes.string.isRequired,
            Featured: PropTypes.string.isRequired,
        })
    ).isRequired,
};