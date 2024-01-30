import { MovieCard } from '../movie-card/movie-card'
import { Col, Row } from 'react-bootstrap'

export const MoviesBiography = ({ movies, token, user, setUser }) => {

  const dramaMovies = movies.filter((movie) => movie.Genre === 'Biography')

  return (
    <>
      <div className="genre__header mb-4 text-center">
        <h2 className="mb-2 h2__text-gerne">Biography Movies</h2>
        <p>
          Biographical films vividly portray captivating life stories,
          achievements, and legacies, offering an engaging cinematic experience.
        </p>
      </div>
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
    </>
  )
}
