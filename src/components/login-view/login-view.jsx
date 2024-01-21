import { useState } from "react"
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://movie-api-lina-834bc70d6952.herokuapp.com/users/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("Username or password is wrong");
                }
            })
            .catch((error) => {
                console.error("Error occurred during login:", error);
                alert("An error occurred during login. Please try again.");
            })

    }

    return (

        <Form onSubmit={handleSubmit} className="mx-auto mt-5">
            <h2 className="text-center mb-4">LOGIN</h2>
            <Form.Group controlId="formUsername" className="mb-2">
                <Form.Label><strong> Username:</strong></Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label><strong>Password: </strong></Form.Label>
                <div className="mb-3">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </Form.Group>
            <div className="d-flex justify-content-between">
                <Button variant="danger" type="submit">
                    Submit
                </Button>
                <p>
                    New to myFlix? <Link to="/signup">Signup!</Link>
                </p>
            </div>
        </Form>

    )
}