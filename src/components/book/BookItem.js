import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {EditBook} from "./EditBook";

export const BookItem = ({book}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    function deleteBook(id){
        return protectedAxios.delete(`/api/book/delete/${id}`, {
            signal: controller.signal,
            method: "DELETE",
            headers:{"Accept" : "application/json",
                "Content-Type" : "application/json"},
        }).then(() =>{
            console.log("deleted")
        })}

    var arr = [book.bookCategories];
    let categories = arr.join(", ");

    return (
        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
            <div className="card card-default p-4">
                <h5 className="mt-0 mb-2 text-dark">{book.name}</h5>
                <div>
                    <img src={`data:image/jpeg;base64,${book.photo}`} height={100} className="position-relative top-50 start-50" />
                </div>
                <li className="d-flex">
                    <i className="mdi mdi-map mr-1"></i>
                    <span>{book.description}</span>
                </li>
                <li className="d-flex">
                    <i className="mdi mdi-map mr-1"></i>
                    <span>By: {book.authorName}</span>
                </li>
                <li className="d-flex">
                    <i className="mdi mdi-map mr-1"></i>
                    <span>Categories: {categories}</span>
                </li>
                <p/>
                <div className="position-relative">
                    <Button onClick={handleShow} className="btn btn-danger">
                        <FontAwesomeIcon icon="trash"> </FontAwesomeIcon>
                    </Button>
                    <EditBook book={book}></EditBook>
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
            <p/>
        </div>
    )
}
