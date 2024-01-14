import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import { useParams } from "react-router";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <img className="movie-image" src={movie.ImagePath} alt={movie.Title} />
            </div>
            <div>

            </div>
            <div>
                <span> Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span> Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span> Genre: </span>
                <span>{movie.Genre}</span>
            </div>
            <div>
                <span> Director: </span>
                <span>{movie.Director}</span>
            </div>
            <div>
                <span> Actors: </span>
                <span>{movie.Actors}</span>
            </div>
            <div>
                <span> Featured:</span>
                <span>{movie.Featured}</span>
            </div>
            <div>
                <Link to={`/`}>
                    <button >Go Back</button>
                </Link>
            </div>
        </div>
    )
}

MovieView.propTypes = {
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