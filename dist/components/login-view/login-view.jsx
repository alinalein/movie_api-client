import { useState } from "react"

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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => response.json())
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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
            </label>
            <label>
                Password:
                <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="3"
                    maxLength="20"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}