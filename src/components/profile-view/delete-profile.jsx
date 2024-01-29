import { Col, Button, Row } from 'react-bootstrap'
import './profile-view.scss'

export const DeleteProfile = ({ user, setUser, token }) => {

  const handleDeleteClick = (event) => {
    event.preventDefault()

    // pop up window for delete confirmation
    const userConfirmed = window.confirm(
      'Do you really want to delete your profile?',
    )

    if (userConfirmed) {
      fetch(
        `https://movie-api-lina-834bc70d6952.herokuapp.com/users/deregister/${user.Username}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            // If the update is successful, update the local state
            alert('You successfully deleted your profile')
            setUser(null)
            setToken(null)
            localStorage.clear()
          } else {
            console.error('Failed to delete your profile')
          }
        })
        .catch((error) => {
          console.error('Error deleting user', error)
        })
    }
  }

  return (
    <Row className="justify-content-md-center text-center profile_component mx-auto mt-2 ">
      <h2 className="mb-4 h2__text">DELETE YOUR PROFILE</h2>
      <p>Do you you really want to delete your account?</p>
      <p>We're sorry we have to say GOODBYE. </p>
      <p className="mb-4">You are always welcome back!</p>

      <Col className="mb-2">
        <Button variant="info" onClick={handleDeleteClick}>
          Delete Profile
        </Button>
      </Col>
    </Row>
  )
}
