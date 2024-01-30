import { MovieCard } from '../movie-card/movie-card'
import { Col, Row } from 'react-bootstrap'

export const MoviesAction = ({ movies, token, user, setUser }) => {

  const dramaMovies = movies.filter((movie) => movie.Genre === 'Action')

  return (
    <>
      <div className="genre__header mb-4 text-center">
        <h2 className="mb-2 h2__text-gerne">Action Movies</h2>
        <p>
          Action films guarantee an adrenaline-packed ride with intense thrills
          and high-stakes scenarios, ensuring an edge-of-your-seat cinematic
          adventure.
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