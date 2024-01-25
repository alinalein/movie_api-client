import { createRoot } from 'react-dom/client'
import React from 'react'
import { useState, useEffect } from 'react'
import { MainView } from './components/main-view/main-view'
import { Container } from 'react-bootstrap'

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss'

// Main component (will eventually use all the others)
const MovieApi = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(storedUser ? storedUser : null)

  // when user not logged in add class background-image to body of page
  useEffect(() => {
    document.body.classList.toggle('background-image', !user)
  }, [user])
  return (
    <Container>
      <MainView user={user} setUser={setUser} />
    </Container>
  )
}

// Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

// Tells React to render your app in the root DOM element
root.render(<MovieApi />)
