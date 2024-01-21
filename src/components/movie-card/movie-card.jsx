import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"

export const MovieCard = ({ movie, token, user, setUser }) => {

    const isMovieInFavorites = user.FavoriteMovies.includes(movie.id);

    const addToFavorites = async () => {
        try {
            const response = await fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${user.Username}/movies/add/${movie.id}	`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                // Movie successfully added to favorites
                const updatedUser = { ...user, FavoriteMovies: [...user.FavoriteMovies, movie.id] };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                console.log('Movie added to favorites');
            } else {
                console.error('Failed to add movie to favorites');
            }
        } catch (error) {
            console.error('Error adding movie to favorites', error);
        }
    };

    const removeFromFavorites = async () => {
        try {
            const response = await fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${user.Username}/movies/remove/${movie.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                //updates the state of user -> so the UI changes when user removes the movie
                // create copy of object user & keeps all movies from fav except the one where id is id of movie the user clicked on 
                const updatedUser = { ...user, FavoriteMovies: user.FavoriteMovies.filter(id => id !== movie.id) };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                console.log('Movie removed from favorites');
            } else {
                console.error('Failed to remove movie from favorites');
            }
        } catch (error) {
            console.error('Error removing movie from favorites', error);
        }
    };

    return (
        <>
            <Card className="h-100">
                <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
                <Card.Body>
                    <Card.Title className="text-center mb-4">{movie.Title}</Card.Title>
                    {/* <Card.Text>{movie.Description}</Card.Text> */}
                    <div className="d-flex justify-content-between">
                        <Link to={`/movies/${movie.id}`}>
                            <Button variant="link">
                                View Details
                            </Button>
                        </Link>

                        {isMovieInFavorites ? (
                            <Button variant="" onClick={removeFromFavorites}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>                        </Button>
                        ) : (
                            <Button variant="" onClick={addToFavorites}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>                        </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Actors: PropTypes.string.isRequired,
        Featured: PropTypes.string.isRequired
    }).isRequired
}