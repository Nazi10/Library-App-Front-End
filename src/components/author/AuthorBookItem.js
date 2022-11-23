import {useState} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {EditAuthorBook} from "./EditAuthorBook";

export const AuthorBookItem = ({book}) => {
    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteBook(id) {
        return protectedAxios.delete(`/api/book/delete/${id}`, {
            signal: controller.signal,
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then(() => {
            console.log("deleted")
        })
    }

    return (

        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
            <div className="card card-default p-4">
                <h5 className="mt-0 mb-2 text-dark">{book.name}</h5>
                <div>
                    <img src={`data:image/jpeg;base64,${book.photo}`} height={100}/>
                </div>
                <li className="d-flex">
                    <i className="mdi mdi-map mr-1"></i>
                    <span>{book.description}</span>
                </li>
                <p/>
                <div className="position-relative">
                    <Button onClick={handleShow} className="btn btn-danger">
                        <FontAwesomeIcon icon="trash"> </FontAwesomeIcon>
                    </Button>
                    <EditAuthorBook book={book}></EditAuthorBook>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete {book.name}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant={"danger"} onClick={() => deleteBook(book.id)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    )
}
