import { useState } from "react";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: 1,
            Title: "The Shawshank Redemption",
            Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            Genre: "Drama",
            Director: "Frank Darabont",
            Actors: ["Tim Robbins", "Morgan Freeman"],
            ImagePath: "https://irs.www.warnerbros.com/gallery-jpeg/the_shawshank_redemption_posterlarge_0-675188670.jpg",
            Featured: true
        },
        {
            _id: 2,
            Title: "Inception",
            Description: "A thief who enters the dreams of others to steal their secrets faces a new challenge: planting an idea in a target's mind.",
            Genre: "Sci-Fi",
            Director: "Christopher Nolan",
            Actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
            ImagePath: "https://i.pinimg.com/originals/ea/11/d8/ea11d8c415a8ee9f880b90b12558e717.jpg",
            Featured: false
        },
        {
            _id: 3,
            Title: "The Godfather",
            Description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            Genre: "Crime",
            Director: "Francis Ford Coppola",
            Actors: ["Marlon Brando", "Al Pacino"],
            ImagePath: "https://picfiles.alphacoders.com/137/thumb-1920-137115.jpg",
            Featured: false
        },
        {
            _id: 4,
            Title: "The Dark Knight",
            Description: "When the menace known as The Joker emerges, Batman must confront his greatest psychological and physical challenge.",
            Genre: "Action",
            Director: "Christopher Nolan",
            Actors: ["Christian Bale", "Heath Ledger"],
            ImagePath: "https://th.bing.com/th/id/OIP.yfBaChdkFemGi-NW6bJ-iwHaEo?rs=1&pid=ImgDetMain",
            Featured: true
        },
        {
            _id: 5,
            Title: "Pulp Fiction",
            Description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            Genre: "Crime",
            Director: "Quentin Tarantino",
            Actors: ["John Travolta", "Samuel L. Jackson"],
            ImagePath: "https://www.themoviedb.org/t/p/original/jlVOS4D6ledQGxGdL0EIte3TXfL.jpg",
            Featured: false
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => selectedMovie(null)} />
        )
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}

        </div>
    );
};