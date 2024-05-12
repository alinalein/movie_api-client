import { MovieCard } from '../movie-card/movie-card'
import { Col } from 'react-bootstrap'
import './movies-gerne.scss'
import { useSelector } from 'react-redux'

export const MoviesDrama = () => {

  const movies = useSelector((state) => state.movies.list)

  const dramaMovies = movies.filter((movie) => movie.Genre === 'Drama')

  return (
    <>
      <div className="genre__header mb-4 text-center">
        <h2 className="mb-2 h2__text-gerne">Drama Movies</h2>
        <p>
          Drama movies dive into the complexities of human emotions and
          relationships, filled with real-life depth and resonance.
        </p>
      </div>
      {dramaMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3} sm={6} xs={12}>
          <MovieCard
            movie={movie}
          />
        </Col>
      ))}
    </>
  )
}
