import {useState} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from '@fortawesome/fontawesome-free-solid'

export const EditCategory = ({category}) => {
    const [name, setName] = useState(category.name);
    const [priority, setPriority] = useState(category.priority);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    const handleSubmit = event => {
        let id = category.id
        const updateCategory = {id, name, priority};
        protectedAxios.put(`/api/category/update`, updateCategory, {
            signal: controller.signal,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateCategory)
        }).then((res) => {
            return res
        })
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <FontAwesomeIcon icon="fa-pencil-alt"></FontAwesomeIcon>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit {category.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={"form"} onSubmit={handleSubmit}>
                        <input className="form-control"
                               type="text"
                               value={name}
                               placeholder="Name"
                               onChange={(e) => setName(e.target.value)}
                        ></input>
                        <p/>
                        <input className="form-control"
                               type="text"
                               value={priority}
                               placeholder="Bio"
                               onChange={(e) => setPriority(e.target.value)}
                        ></input>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">Update</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )

}
