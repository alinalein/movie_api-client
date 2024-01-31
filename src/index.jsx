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

  // change the state of user depending if there is one or not 
  // if yes will show background picture 
  useEffect(() => {
    document.body.classList.toggle('background-image', !user)
  }, [user])

  // makes sure pic is loaded on time when user opens app 
  useEffect(() => {
    const img = new Image();
    img.src = '../img/final.webp';
  }, []);

  return (
    <MainView user={user} setUser={setUser} />
  )
}

// Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

// Tells React to render your app in the root DOM element
root.render(<MovieApi />)
