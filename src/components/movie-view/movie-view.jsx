import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Button, Col, Card, Row } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import { FavoriteToggle } from '../toggle-favorite/toggle-favorite'
import './movie-view.scss'

export const MovieView = ({ movies, token, user, setUser }) => {

  // only access the param from the before set path (here in main) for the movieId
  const { movieId } = useParams()
  const [showSimilarMovies, setShowSimilarMovies] = useState(false)
  // got the whole movies array from main->here look for specific movie user klicked on by id-> then show details about this movie
  const movie = movies.find((m) => m.id === movieId)

  const findSimilarMovies = () => {
    return movies.filter((m) => m.Genre === movie.Genre && m.id !== movie.id)
  }
  return (
    <Row className="justify-content-center ">
      <Col className="mb-4 movie__shadow" key={movie.id} md={4} sm={8}>
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            className="img-fluid"
            alt={movie.Title}
          />
          <Card.Body className="card__body">
            <Card.Title
              className="mb-3 text-center"
              style={{ fontSize: '1.5rem', color: 'white' }}
            >
              {movie.Title}
            </Card.Title>
            <Card.Text className="mb-1">
              <strong>Genre: </strong>
              {movie.Genre}
            </Card.Text>
            <Card.Text className="mb-1">
              <strong>Director: </strong>
              {movie.Director}
            </Card.Text>
            <Card.Text className="mb-1">
              <strong>Actors: </strong>
              {movie.Actors}
            </Card.Text>
            <Card.Text className="mb-4">
              <strong>Description: </strong>
              {movie.Description}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Link to={`/`}>
                <Button variant="outline-info" className="mb-1">
                  Go Back
                </Button>
              </Link>
              <FavoriteToggle
                user={user}
                setUser={setUser}
                token={token}
                movie={movie}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
      {/* when showSimilarMovies is set to thrue and the result of function bigger than 0 , then show  */}
      {showSimilarMovies && findSimilarMovies().length > 0 ? (
        <>
          <Row className="justify-content-center mt-2">
            {/* <h2 className="text-center mb-3">Similar movies</h2> */}
            {findSimilarMovies().map((similarmovie) => (
              <Col
                className="mb-3 movie_img--size"
                key={similarmovie.id}
                md={3}
                sm={4}
                xs={12}
              >
                <MovieCard
                  movie={similarmovie}
                  token={token}
                  user={user}
                  setUser={setUser}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-center mb-3">
              <Button
                variant="info"
                onClick={() => setShowSimilarMovies(false)}
              >
                Close Similar Movies
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col className="text-center mb-3">
            {/* sets the showSimilarMovies to true , what will open them  */}
            <Button variant="info" onClick={() => setShowSimilarMovies(true)}>
              Don't miss out, see Similar Movies!
            </Button>
          </Col>
        </Row>
      )}
    </Row>
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
    }),
  ).isRequired,
}
