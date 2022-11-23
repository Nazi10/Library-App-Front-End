import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {EditCategory} from "./EditCategory";

export const CategoryItem = ({category}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    function deleteCategory(id) {
        protectedAxios.delete(`/api/category/delete/${id}`, {
            signal: controller.signal,
            method: "DELETE",
            headers:{"Accept" : "application/json",
                "Content-Type" : "application/json"},
        }).then(() =>{
            console.log("deleted")
        })
    }

    return (
        <tr>
            <td>{category.name}</td>
            <td>{category.priority}</td>
            <td>
                <Button onClick={handleShow} className="btn btn-danger">
                    <FontAwesomeIcon icon="trash"> </FontAwesomeIcon>
                </Button>

                <EditCategory category={category}></EditCategory>
            </td>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete {category.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant={"danger"} onClick={() => deleteCategory(category.id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </tr>
    )
}
