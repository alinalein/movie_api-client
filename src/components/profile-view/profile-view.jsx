import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, movies, setUser, token, setToken }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [isEditing, setIsEditing] = useState(false);

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id))
    console.log('User profile-view:', user);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    // formats the date from DB to a date 
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const handleSaveClick = (event) => {
        event.preventDefault();

        const updatedUser = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            FavoriteMovies: favoriteMovies
        };

        fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/update/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                // If the update is successful, update the local state
                setIsEditing(false);
                setUser(updatedUser);
                alert("You successfully updated your profile");
                console.log("User state updated:", updatedUser);
            } else {
                console.error('Failed to update user information');
            }
        }).catch(error => {
            console.error('Error updating user information', error);
        });
    };

    const handleDeleteClick = (event) => {
        event.preventDefault();

        // pop up window for delete confirmation
        const userConfirmed = window.confirm("Do you really want to delete your profile?");

        if (userConfirmed) {
            fetch(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/deregister/${user.Username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }).then((response) => {
                if (response.ok) {
                    // If the update is successful, update the local state
                    alert("You successfully deleted your profile");
                    setUser(null);
                    setToken(null);
                    localStorage.clear();

                } else {
                    console.error('Failed to delete your profile');
                }
            }).catch(error => {
                console.error('Error deleting user', error);
            });
        }
    };

    return (
        <Col>
            <h2>User Profile:</h2>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {formatDate(user.Birthday)}</p>

            {isEditing ? (
                // Pull values from the input fields 
                <Form onSubmit={handleSaveClick}>
                    <Form.Group controlId="formUsername">
                        <Form.Label> Username: </Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="5"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label> Email: </Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirtday">
                        <Form.Label>Birthday:</Form.Label>
                        <div className="mb-3">
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            ) : (
                <>
                    <Button className="mr-5" onClick={handleEditClick}>Edit</Button>

                    <Button className="ml-5" onClick={handleDeleteClick}>Delete Profile</Button>
                </>
            )}
            <>
                {favoriteMovies.map((movie) => (
                    <Col className="mb-5" key={movie.id} md={5}>
                        <MovieCard movie={movie} token={token} user={user} setUser={setUser} />
                    </Col>
                ))}
            </>
        </Col>
    );
};
