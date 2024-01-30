import React, { useState, useEffect } from 'react'
import { Form, FormControl, Button, Row, Col, Alert } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import './search-movie.scss'

export const SearchMovie = ({ movies, token, user, setUser }) => {
  const [searchTitle, setSearchTitle] = useState('')
  // set search results to an empty array
  const [searchResults, setSearchResults] = useState([])
  const [showNoResultMessage, setShowNoResultMessage] = useState(false)

  const handleSearch = () => {
    // remove white spaace and all letters to lower case
    const searchInput = searchTitle.trim().toLowerCase();

    if (searchInput === '') {
      setSearchResults([]);
      setShowNoResultMessage(false);
    } else {
      const filteredMovies = movies.filter((movie) => {
        const movieTitle = movie.Title.toLowerCase();
        // add spaces , to handle titels that have multiple words, splits it into an array of substrings 
        const searchInputs = searchInput.split(' ');
        // checks of any of the array are part of every single movie
        return searchInputs.every((input) => movieTitle.includes(input));
      });

      if (filteredMovies.length === 0) {
        setSearchResults([]);
        setShowNoResultMessage(true);
      } else {
        setSearchResults(filteredMovies);
        setShowNoResultMessage(false);
      }
    }
  };

  //makes sure that handle search only executed after the state of searchResults is updated
  // also search title has to be not ''
  useEffect(() => {
    if (searchTitle.trim() !== '') {
      handleSearch();
    }
  }, [searchTitle]);

  const handleClear = () => {
    setSearchTitle('')
    setShowNoResultMessage(false)
    setSearchResults([])
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} className="search__header mb-4">
          <h3 className="mb-4 h2__text text-center">SEARCH FOR YOUR MOVIE</h3>
          <Form className="mb-3 text-center">
            <Form.Group controlId="formSearch">
              <div className="d-flex justify-content-between">
                <Col md={11} sm={11} xs={11} className="search__input">
                  <FormControl
                    type="text"
                    placeholder="Search by Title"
                    className="mr-sm-2"
                    value={searchTitle}
                    onChange={(e) => {
                      const newSearchTitle = e.target.value;
                      setSearchTitle(newSearchTitle);
                      console.log('new input:', newSearchTitle);
                      handleSearch();
                    }}
                    // makes sure search function executed when keyup
                    onKeyUp={handleSearch
                    }
                  // if it should listen to a specific key do:
                  // onKeyUp={(e) => {
                  //   if (e.key === "Backspace") {
                  //     handleSearch();
                  //   }

                  // }}
                  />
                </Col>
                <Col md={1} sm={1} xs={1} className="clear-button">
                  <Button
                    variant="link"
                    className="clear-button"
                    onClick={handleClear}
                  >
                    x
                  </Button>
                  {/* <Button variant="outline-success" onClick={handleSearch}>
                  Search
                </Button> */}
                </Col>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {showNoResultMessage && (
        <Col md={6}>
          <Alert className="text-center"
            md={5}
            style={{
              background: 'black',
              color: '#ffffff8c',
              border: 'black',
            }}
          >
            Unfortunately, no movie matches your search.
          </Alert>
        </Col>
      )}
      {searchResults.map((foundMovie) => (
        <Col className="mb-4" key={foundMovie.id} md={3} sm={6} xs={12}>
          <MovieCard
            movie={foundMovie}
            token={token}
            user={user}
            setUser={setUser}
          />
        </Col>
      ))}
    </>
  )
}
