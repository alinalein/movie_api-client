import { useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const SignupView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    }

    // set the data from the form to data in DB and send it , convert the JS object to a JSON string 
    fetch('https://movie-api-lina-834bc70d6952.herokuapp.com/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('You have been signed up')
          // window has to reload that movies are now shown instead of the login page 
          window.location.reload()
        } else if (response.status === 422) {
          return response.json()
        } else {
          alert('The signup failed')
        }
      })
      // eror catching 
      .then((data) => {
        if (data && data.errors && data.errors.length > 0) {
          data.errors.forEach((error) => {
            alert(error.msg)
            console.error('Validation Error:', error.msg)
          })
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error)
        alert('An error occurred during signup')
      })
  }

  return (
    <Row className="login_component mt-3">
      <Form onSubmit={handleSubmit} className="mx-auto ">
        <h2 className="text-center mb-4 h2__text">SIGNUP</h2>
        <Form.Group controlId="formUsername" className="mb-2">
          <Form.Label className="form__text">
            <strong> Username: </strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            // when input in this field will change , set the it to the value of usernmame
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
          <small className="small__text ">
            Username, please choose at least 5 characters, only letters and
            numbers
          </small>
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-2">
          <Form.Label className="form__text">
            <strong>Password:</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
          <small className="small__text ">
            Password, please choose at least 8 characters
          </small>
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-2">
          <Form.Label className="form__text">
            {' '}
            <strong>Email: </strong>
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirtday">
          <Form.Label className="form__text">
            <strong>Birthday:</strong>
          </Form.Label>
          <div className="mb-3">
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="info" type="submit">
              Submit
            </Button>
            <p>
              Have an account? <Link to="/login">Login!</Link>
            </p>
          </div>
        </Form.Group>
      </Form>
    </Row>
  )
}
