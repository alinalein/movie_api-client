import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, user, token, setUser }) => {

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))

    return (
        <Col>
            {favoriteMovies.length > 0 ? (
                favoriteMovies.map((movie) => (
                    <Col className="mb-5" key={movie.id} md={5}>
                        <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                    </Col>
                ))
            ) : (
                <Alert variant="info">
                    You have not added any movies to your favorites so far.
                </Alert>
            )}
        </Col>
    );
};

