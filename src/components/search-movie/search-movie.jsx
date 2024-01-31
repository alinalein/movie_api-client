import React, { useState, useEffect } from 'react'
import { Form, FormControl, Button, Row, Col, Alert } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import './search-movie.scss'

export const SearchMovie = ({ movies, token, user, setUser }) => {

  const [searchTitle, setSearchTitle] = useState('')
  //when user opens all movies are shown already
  const [searchResults, setSearchResults] = useState([movies])
  const [showNoResultMessage, setShowNoResultMessage] = useState(false)

  const handleSearch = () => {
    const searchInput = searchTitle.trim().toLowerCase()
    if (
      movies.every((movie) => !movie.Title.toLowerCase().includes(searchInput))
    ) {
      setSearchResults([])
      setShowNoResultMessage(true)
    } else {
      const filteredMovies = movies.filter((movie) => {
        const movieTitle = movie.Title.toLowerCase()
        const searchInputs = searchInput.split(' ')
        return searchInputs.every((input) => movieTitle.includes(input))
      })
      setSearchResults(filteredMovies)
      setShowNoResultMessage(false)
    }
  }

  //makes sure that handle search only executed after the state of searchResultsis updated
  useEffect(() => {
    handleSearch();
  }, [searchTitle]);

  const handleClear = () => {
    setSearchTitle('')
    setShowNoResultMessage(false)
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
                    onKeyUp={(e) => {
                      if (e.key === "Backspace") {
                        handleSearch();
                      }
                    }}
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
