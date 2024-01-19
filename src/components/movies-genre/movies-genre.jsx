

export const MoviesDrama = ({ movies }) => {

    // Filter movies with the genre "Drama"
    const dramaMovies = movies.filter(movie => movie.Genre.Name === 'Drama');

    // Sort the filtered dramaMovies by title
    dramaMovies.sort((a, b) => a.Title.localeCompare(b.Title));

    return (
        <div>
            <h2>Drama Movies</h2>
            <p>Drama is a category of narrative fiction intended to be more serious t…</p>
            <ul>
                {dramaMovies.map(movie => (
                    <li key={movie.id}>{movie.Title}</li>
                ))}
            </ul>
        </div>
    );
};


