import { useState } from "react";
import { Form, Button } from "react-bootstrap";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch("https://movie-api-lina-834bc70d6952.herokuapp.com/users/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("You have been signed up");
                window.location.reload();
            } else if (response.status === 422) {
                return response.json();
            } else {
                alert("The signup failed");
            }
        })
            .then((data) => {
                if (data && data.errors && data.errors.length > 0) {
                    data.errors.forEach((error) => {
                        alert(error.msg)
                        console.error("Validation Error:", error.msg);
                    });
                }
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                alert("An error occurred during signup");
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>SIGNUP</h2>
            <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    placeholder="Username must be at least 5 characters and contain only letters and numbers"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password must be at least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label> Email: </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBirtday">
                <Form.Label>Birthday:</Form.Label>
                <div className="mb-3">
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    )
}