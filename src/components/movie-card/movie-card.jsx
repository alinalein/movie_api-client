import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"
import { MovieView } from "../movie-view/movie-view";

export const MovieCard = ({ movie, token, user, setUser }) => {

    const handleAddToFavorites = async () => {
        try {
            const response = await fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${user.Username}/movies/add/${movie.id}	`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                alert("added");
                // Movie successfully added to favorites
                const updatedUser = { ...user, FavoriteMovies: [...user.FavoriteMovies, movie.id] };
                setUser(updatedUser);
                console.log('Movie added to favorites');
            } else {
                console.error('Failed to add movie to favorites');
            }
        } catch (error) {
            console.error('Error adding movie to favorites', error);
        }
    };

    const handleRemoveFromFavorites = async () => {
        try {
            const response = await fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${user.Username}/movies/remove/${movie.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("removed");
                //updates the state of user -> so the UI changes when user removes the movie
                // create copy of object user & keeps all movies from fav except the one where id is id of movie the user clicked on 
                const updatedUser = { ...user, FavoriteMovies: user.FavoriteMovies.filter(id => id !== movie.id) };
                setUser(updatedUser);
                console.log('Movie removed from favorites');
            } else {
                console.error('Failed to remove movie from favorites');
            }
        } catch (error) {
            console.error('Error removing movie from favorites', error);
        }
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>

                <Link to={`/movies/${movie.id}`}>
                    <Button variant="link">
                        View Details
                    </Button>
                </Link>

                <Button variant="primary" onClick={handleAddToFavorites}>
                    Add to Favorite
                </Button>
                <Button variant="" onClick={handleRemoveFromFavorites}>
                    Delete from Favorites
                </Button>

            </Card.Body>
        </Card>

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