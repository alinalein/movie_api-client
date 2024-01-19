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
                    alert("No such user known");
                }
            })
            .catch((error) => {
                console.error("Error occurred during login:", error);
                alert("An error occurred during login. Please try again.");
            })

    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
            <Form.Group controlId="formUsername">
                <Form.Label> Username: </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <div className="mb-3">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </Form.Group>
            <Row className="mb-3">
                <Col>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
                <Col >
                    <p>
                        New to myFlix? <Link to="/signup">Signup!</Link>
                    </p>
                </Col>
            </Row>
        </Form>
    )
}