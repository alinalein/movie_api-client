import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col, Row, Alert } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export const SearchMovie = ({ movies, token, user, setUser }) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNoResultMessage, setShowNoResultMessage] = useState(false);

    const handleSearch = () => {
        const searchTerm = searchTitle.trim().toLowerCase();
        if (searchTerm === '' || movies.every(movie => !movie.Title.toLowerCase().includes(searchTerm))) {
            setSearchResults([]);
            setShowNoResultMessage(true);
        } else {
            const filteredMovies = movies.filter(movie => {
                const movieTitle = movie.Title.toLowerCase();
                const searchTerms = searchTerm.split(' ');
                return searchTerms.every(term => movieTitle.includes(term));
            });
            setSearchResults(filteredMovies);
            setShowNoResultMessage(false);
        }
    };

    return (
        <Row className="justify-content-md-center">
            <h3>SEARCH FOR A MOVIE BY TITLE</h3>
            <Form inline className="mb-3">
                <Form.Group controlId="formSearch">
                    <Form.Label>Search</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Search by title"
                        className="mr-sm-2"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                </Form.Group>
                <Button variant="outline-success" onClick={handleSearch}>
                    Search
                </Button>
            </Form>
            {showNoResultMessage && (
                <Alert variant="info">
                    No movie matches your search.
                </Alert>
            )}
            {searchResults.map((foundMovie) => (
                <Col className="mb-3" key={foundMovie.id} md={3}>
                    <MovieCard movie={foundMovie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}
        </Row>
    );
};
