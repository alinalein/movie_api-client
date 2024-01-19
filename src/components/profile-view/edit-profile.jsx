import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/helpers/helpers';

export const EditProfile = ({ user, setUser, token }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState(user.Birthday);

    const navigate = useNavigate();

    // add only update when new value + check username not DB jet 

    const handleSaveClick = async (event) => {
        event.preventDefault();

        const updatedUser = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            FavoriteMovies: user.FavoriteMovies
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
                setUser(updatedUser);
                alert("You successfully updated your profile");
                navigate("/user-profile");
                console.log("User state updated:", updatedUser);
            } else if (response.status === 401) {
                const data = await response.json();
                console.error('Unauthorized:', data.error);
                alert(data.error);
            } else if (response.status === 422) {
                const data = await response.json();
                console.error('Validation Error:', data.errors);
            } else {
                console.error('Failed to update user information');
            }

        } catch (error) {
            console.error('Error updating user information', error);
        }
    };



    return (
        <Col>
            <h6>Only write input to the fields you would like to update</h6>
            <Form onSubmit={handleSaveClick}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Current Username: {user.Username}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username must be at least 5 characters and contain only letters and numbers"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength="5"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label> Current Email: {user.Email}</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBirtday">
                    <Form.Label>Current Birthday: {formatDate(user.Birthday)}</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Birthday"
                        value={birthday}
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
