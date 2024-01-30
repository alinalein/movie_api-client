import { MovieCard } from '../movie-card/movie-card'
import { Col, Row } from 'react-bootstrap'

export const MoviesCrime = ({ movies, token, user, setUser }) => {

  const dramaMovies = movies.filter((movie) => movie.Genre === 'Crime')

  return (
    <Row className="justify-content-center text-center">
      <Row className="genre__header mb-4">
        <h2 className="mb-2 h2__text-gerne">Crime Movies</h2>
        <p>
          Crime films promise a thrilling experience with suspenseful plots,
          mysterious twists, and a captivating exploration of criminal
          activities/investigations.
        </p>
      </Row>
      {dramaMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3} sm={6} xs={12}>
          <MovieCard
            movie={movie}
            token={token}
            user={user}
            setUser={setUser}
          />
        </Col>
      ))}
    </Row>
  )
}
