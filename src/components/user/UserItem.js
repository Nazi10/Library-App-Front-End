import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {EditUser} from "./EditUser";

export const UserItem = ({user}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    function deleteUser(id) {
        protectedAxios.delete(`/api/user/delete/${id}`, {
            signal: controller.signal,
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(() => {
            console.log("deleted")
        })
    }

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.roleName}</td>
            <td>
                <Button onClick={handleShow} className="btn btn-danger">
                    <FontAwesomeIcon icon="trash"> </FontAwesomeIcon>
                </Button>
                <EditUser user={user}></EditUser>
            </td>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete {user.username}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant={"danger"} onClick={() => deleteUser(user.id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    )
}
