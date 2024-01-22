import React from 'react';
import { Col, Alert, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, user, token, setUser }) => {

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))

    return (
        <Row className="justify-content-center" >
            {
                favoriteMovies.length > 0 ? (
                    favoriteMovies.map((movie) => (
                        <Col className="mb-3" key={movie.id} md={3} >
                            <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                        </Col>
                    ))
                ) : (
                    <Alert variant="info">
                        You have not added any movies to your favorites list so far.
                    </Alert>
                )
            }

        </Row >

    );
};

