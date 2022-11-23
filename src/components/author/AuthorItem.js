import {useState} from "react";
import {Button, Modal, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/fontawesome-free-solid'
import { NavLink} from "react-router-dom";
import useAxiosPrivate from "../../api/useAxiosPrivate";

export const AuthorItem = ({author}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    function deleteAuthor(id) {
        debugger
        protectedAxios.delete(`/api/user/delete/${id}`, {
            signal: controller.signal,
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then(() => {
            console.log("deleted")
        });
    }

    return (
        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
            <div className="card card-default p-4">
                <h5 className="mt-0 mb-2 text-dark">{author.name}</h5>
                <li className="d-flex">
                    <span>{author.bio}</span>
                </li>
                <p/>
                <div>
                    <Button onClick={handleShow} className="btn btn-danger">
                        <FontAwesomeIcon icon="trash"> </FontAwesomeIcon>
                    </Button>
                    <p/>
                </div>
                <p/>
                <div>
                    <Nav.Link to= {`book/${author.id}`} as={NavLink}>
                        <Button variant="info">Books: {author.bookNumber} in total</Button>
                    </Nav.Link>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete {author.name}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant={"danger"} onClick={() => deleteAuthor(author.id)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
