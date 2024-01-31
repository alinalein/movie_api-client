import { createRoot } from 'react-dom/client'
import React from 'react'
import { useState, useEffect } from 'react'
import { MainView } from './components/main-view/main-view'

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss'

// Main component (will eventually use all the others)
const MovieApi = () => {

  const storedUser = JSON.parse(localStorage.getItem('user'))
  //Create state variable, called user with initial stale "null". Use to check if user is logged in or not.
  const [user, setUser] = useState(storedUser ? storedUser : null)

  useEffect(() => {
    const img = new Image();
    img.src = '../img/final.webp';
  }, []);

  // when user not logged in add class background-image to body of page
  useEffect(() => {
    document.body.classList.toggle('background-image', !user)
  }, [user])

  return (

    <MainView user={user} setUser={setUser} />

  )
}

// Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

// Tells React to render your app in the root DOM element
root.render(<MovieApi />)
