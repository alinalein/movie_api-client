import React from 'react'
import { Col, Alert, Row } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

export const FavoriteMovies = ({ movies, user, token, setUser }) => {
  let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id))

  return (
    <Row className="justify-content-center">
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <Col
            className="mb-3 movie_img--size"
            key={movie.id}
            md={3}
            sm={6}
            xs={12}
          >
            <MovieCard
              movie={movie}
              token={token}
              user={user}
              setUser={setUser}
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
