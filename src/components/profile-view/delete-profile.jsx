import { Col, Button, Row } from "react-bootstrap";

export const DeleteProfile = ({ user, setUser, token }) => {

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
        <Row className="justify-content-md-center">
            <Col>
                <h3>DELETE YOUR PROFILE</h3>
                <Button className="ml-5" onClick={handleDeleteClick}>Delete Profile</Button>
            </Col>
        </Row>
    )
}