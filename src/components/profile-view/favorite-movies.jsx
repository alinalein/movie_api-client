import React from 'react';
import { Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, user }) => {
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))
    return (
        <Col>
            {/* only show component when user has fav movies  */}
            {favoriteMovies.length > 0 && (
                <>
                    {favoriteMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={5}>
                            <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                        </Col>
                    ))}
                </>
            )}
            {/* display message no moviies here jet , when no movies */}
        </Col>
    )
};

