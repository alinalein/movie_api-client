import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { formatDate } from '../../utils/helpers/helpers';
import { Link } from "react-router-dom"
import { PersonBoundingBox } from "react-bootstrap-icons"
import { PersonSquare } from "react-bootstrap-icons"
export const UserProfile = ({ user }) => {

    console.log('profile:', user)
    return (
        <div className="div_component">
            <Col className="text-center mx-auto mt-2">
                <h2 className='mb-4 h2__text'>Your Profile</h2>
                <PersonSquare color="white" size={180} className="mb-3" />
                <p className="mb-3">Username: {user.Username}</p>
                <p className="mb-3">Email: {user.Email}</p>
                <p className="mb-4">Birthday: {formatDate(user.Birthday)}</p>
                <Link to="/edit-profile"><Button variant="info" className='mb-2'>Update Profile</Button></Link>

            </Col>
        </div>
    );
}

