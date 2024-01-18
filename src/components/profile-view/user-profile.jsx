import React from 'react';
import { Col } from 'react-bootstrap';
import { formatDate } from '../../utils/helpers/helpers';

export const UserProfile = ({ user }) => {

    console.log('profile:', user)
    return (
        <Col>
            <h2>Your Profile:</h2>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {formatDate(user.Birthday)}</p>
        </Col>
    );
}

