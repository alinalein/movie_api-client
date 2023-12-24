export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img className="movie-image" src={movie.ImagePath} alt={movie.Title} />
            </div>
            <div>

            </div>
            <div>
                <span> Title:</span>
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
                <button onClick={onBackClick}>Go Back</button>
            </div>
        </div>
    )
}