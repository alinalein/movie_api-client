import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col, Row, Alert } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export const SearchMovie = ({ movies, token, user, setUser }) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        if (searchTitle.trim() === '') {
            setSearchResults([]);
        } else {
            const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(searchTitle.toLowerCase()));
            setSearchResults(filteredMovies);
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
            {searchResults.length === 0 && searchTitle.trim() !== '' && (
                <Alert variant="info">
                    No movie matches your search.
                </Alert>
            )}
            {searchResults.map((foundMovie) => (
                <Col className="mb-3" key={similarmovie.id} md={3}>
                    <MovieCard movie={foundMovie} token={token} user={user} setUser={setUser} />
                </Col>
            ))}
        </Row>
    );
};
