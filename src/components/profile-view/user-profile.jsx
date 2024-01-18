import React from 'react';
import { Col } from 'react-bootstrap';

export const UserProfile = ({ user }) => {

    return (
        <Col>
            <h2>User Profile:</h2>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {user.Birthday}</p>
        </Col>
    );
}

