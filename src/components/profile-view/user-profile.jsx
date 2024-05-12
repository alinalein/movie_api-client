import React from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import { formatDate } from '../../utils/helpers/helpers'
import { Link } from 'react-router-dom'
import { PersonSquare } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

export const UserProfile = () => {

  const user = useSelector((state) => state.user.user)

  return (
    <Row className="profile_component mt-2 mb-3">
      <Col className="text-center mx-auto">
        <h2 className="mb-4 h2__text">Your Profile</h2>
        <PersonSquare color="white" size={180} className="mb-3" />
        <p className="mb-3">
          <strong>Username: </strong>
          <span className="profile__details">{user.Username}</span>
        </p>
        <p className="mb-3">
          <strong>Email: </strong>
          <span className="profile__details">{user.Email}</span>
        </p>
        <p className="mb-4">
          <strong>Birthday: </strong>
          <span className="profile__details">{formatDate(user.Birthday)}</span>
        </p>
        <Link to="/edit-profile">
          <Button variant="info" className="mb-2">
            Update Profile
          </Button>
        </Link>
      </Col>
    </Row>
  )
}
