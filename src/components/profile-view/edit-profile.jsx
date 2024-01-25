import React, { useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../utils/helpers/helpers'

export const EditProfile = ({ user, setUser, token }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const navigate = useNavigate()

  // add only update when new value + check username not DB jet

  const handleSaveClick = async (event) => {
    event.preventDefault()

    const updatedUser = {
      Username: username !== '' ? username : user.Username,
      Email: email !== '' ? email : user.Email,
      Birthday: birthday !== '' ? birthday : user.Birthday,
      FavoriteMovies: user.FavoriteMovies,
    }

    console.log('updated user:', updatedUser)
    try {
      const response = await fetch(
        `https://movie-api-lina-834bc70d6952.herokuapp.com/users/update/${user.Username}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedUser),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        // If the update is successful, update the local state & local storage
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        alert('You successfully updated your profile')
        // navigate to the user profile when update successfull
        navigate('/user-profile')
        console.log('User state updated:', updatedUser)
      } else if (response.status === 401) {
        const data = await response.json()
        console.error('Unauthorized:', data.error)
        alert(data.error)
      } else if (response.status === 422) {
        const data = await response.json()
        console.error('Validation Error:', data.errors)
      } else {
        console.error('Failed to update user information')
      }
    } catch (error) {
      console.error('Error updating user information', error)
    }
  }

  return (
    <Row className="mt-2 profile_component">
      <h2 className="text-center mb-4 h2__text">EDIT YOUR PROFILE</h2>
      <Form onSubmit={handleSaveClick}>
        <Form.Group controlId="formUsername" className="mb-2 form__text">
          <Form.Label>
            <strong> Current Username:</strong>{' '}
            <span className="profile__details">{user.Username}</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            required
          />
          <small className="small__text">
            Username, please choose at least 5 characters, only letters and
            numbers
          </small>
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-2 form__text">
          <Form.Label>
            <strong>Current Email: </strong>
            <span className="profile__details">{user.Email}</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>Optional field</small>
        </Form.Group>
        <Form.Group controlId="formBirtday" className="mb-3 form__text">
          <Form.Label>
            <strong>Current Birthday: </strong>
            <span className="profile__details">
              {formatDate(user.Birthday)}
            </span>
          </Form.Label>
          <Form.Control
            type="date"
            placeholder="Birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="form__input"
          />
          <small>Optional field</small>
        </Form.Group>
        <div className="text-center mb-2">
          <Button variant="info" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Row>
  )
}
