import { MovieCard } from '../movie-card/movie-card'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const MoviesSciFi = () => {

  const movies = useSelector((state) => state.movies.list)

  const dramaMovies = movies.filter((movie) => movie.Genre === 'Sci-Fi')

  return (
    <>
      <div className="genre__header mb-4 text-center">
        <h2 className="mb-2 h2__text-gerne">Sci-Fi Movies</h2>
        <p>
          Sci-Fi movies transport viewers into speculative worlds, exploring
          futuristic concepts and scientific possibilities through imaginative
          storytelling.
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
