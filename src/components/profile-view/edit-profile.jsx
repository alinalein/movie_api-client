import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap'

export const EditProfile = ({ user, setUser, token }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    // const [isEditing, setIsEditing] = useState(true);

    // add only update when new value
    const handleSaveClick = async (event) => {
        event.preventDefault();

        const updatedUser = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        try {
            const response = await fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/update/${user.Username}`, {
                method: "PUT",
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                // If the update is successful, update the local state
                // setIsEditing(false);
                setUser(updatedUser);
                alert("You successfully updated your profile");
                console.log("User state updated:", updatedUser);
            } else {
                console.error('Failed to update user information');
            }
        } catch (error) {
            console.error('Error updating user information', error);
        }
    };

    return (
        <Col>
            <Form onSubmit={handleSaveClick}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Current Username: {user.Username}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="5"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label> Current Email: {user.Email}</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBirtday">
                    <Form.Label>Current Birthday: {user.Birthday}</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Birthday"
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </Col>
    );
}
