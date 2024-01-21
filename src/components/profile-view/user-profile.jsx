import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { formatDate } from '../../utils/helpers/helpers';
import { Link } from "react-router-dom"

export const UserProfile = ({ user }) => {

    console.log('profile:', user)
    return (
        <Col className="text-center mx-auto mt-5">
            <h2 className='mb-4'>Your Profile</h2>
            <p className="mb-3">Username: {user.Username}</p>
            <p className="mb-3">Email: {user.Email}</p>
            <p className="mb-4">Birthday: {formatDate(user.Birthday)}</p>
            <Link to="/edit-profile"><Button>Update Profile</Button></Link>

        </Col>
    );
}

