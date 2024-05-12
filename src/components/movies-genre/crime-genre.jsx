import { MovieCard } from '../movie-card/movie-card'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const MoviesCrime = () => {

  const movies = useSelector((state) => state.movies.list)

  const dramaMovies = movies.filter((movie) => movie.Genre === 'Crime')

  return (
    <>
      <div className="genre__header mb-4 text-center">
        <h2 className="mb-2 h2__text-gerne">Crime Movies</h2>
        <p>
          Crime films promise a thrilling experience with suspenseful plots,
          mysterious twists, and a captivating exploration of criminal
          activities/investigations.
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
