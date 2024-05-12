import React from 'react'
import { Col, Alert, Row } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import { useSelector } from 'react-redux'

export const FavoriteMovies = () => {

  const user = useSelector((state) => state.user.user)
  const movies = useSelector((state) => state.movies.list)

  let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id))

  return (
    <Row className="justify-content-center">
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <Col
            className="movie_img--size mb-4"
            key={movie.id}
            md={3}
            sm={6}
            xs={12}
          >
            <MovieCard
              movie={movie}
            />
          </Col>
        ))
      ) : (
        <Col md={6} className="mt-5">
          <Alert
            variant="info"
            className="text-center mt-5"
            style={{ background: '#0dcaf0', color: 'black' }}
          >
            You have not added any movies to your favorites list so far.
          </Alert>
        </Col>
      )}
    </Row>
  )
}
