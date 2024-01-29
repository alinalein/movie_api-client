import React, { useState } from 'react'
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
    const searchInput = searchTitle.trim().toLowerCase()
    // if input empty string OR the movie from search is not in the array of movies
    if (
      searchInput === '' ||
      movies.every((movie) => !movie.Title.toLowerCase().includes(searchInput))
    ) {
      setSearchResults([])
      setShowNoResultMessage(true)
    } else {
      const filteredMovies = movies.filter((movie) => {
        const movieTitle = movie.Title.toLowerCase()
        // add spaces , to handle titels that have multiple words, splits it into an array of substrings 
        const searchInputs = searchInput.split(' ')
        // checks of any of the array are part of every single movie
        return searchInputs.every((input) => movieTitle.includes(input))
      })
      setSearchResults(filteredMovies)
      setShowNoResultMessage(false)
    }
  }
  const handleClear = () => {
    setSearchTitle('')
    setShowNoResultMessage(false)
  }

  return (
    <>
      <Row className="justify-content-md-center mb-4 text-center">
        <Col md={6} className="search__header">
          <h3 className="mb-4 h2__text">SEARCH FOR YOUR MOVIE</h3>
          <Form className="mb-3 text-center">
            <Form.Group controlId="formSearch" className="mx-auto">
              <Row className="mb-3 text-center">
                <Col md={11} className="search__input">
                  <FormControl
                    type="text"
                    placeholder="Search by Title"
                    className="mr-sm-2"
                    value={searchTitle}
                    onChange={(e) => {
                      setSearchTitle(e.target.value)
                      handleSearch()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSearch()
                      }
                    }}
                  />
                </Col>

                <Col md={1} className="clear-button">
                  <Button
                    variant="link"
                    className="clear-button"
                    onClick={handleClear}
                  >
                    x
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center text-center mt-5">
        {showNoResultMessage && (
          <Col md={6}>
            <Alert
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
      </Row>
      <Row className="justify-content-md-center text-center">
        {searchResults.map((foundMovie) => (
          <Col className="mb-3" key={foundMovie.id} md={3} sm={6} xs={12}>
            <MovieCard
              movie={foundMovie}
              token={token}
              user={user}
              setUser={setUser}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
