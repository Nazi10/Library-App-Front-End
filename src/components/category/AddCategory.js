import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/fontawesome-free-solid'
import useAxiosPrivate from "../../api/useAxiosPrivate";

export const AddCategory = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [priority, setPriority] = useState("");

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    const handleSubmit = event => {
        debugger
        const category = {name, priority};
        return protectedAxios.post(`api/category/add`, category,{
            signal: controller.signal,
            method: "POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify(category),
        })
    }

    return(
        <>
            <Button variant="info" onClick={handleShow}>
                <FontAwesomeIcon icon="fa-plus"></FontAwesomeIcon> Add Category
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control"
                               type="text"
                               value={name}
                               placeholder="Name"
                               onChange={(e) => setName(e.target.value)}
                               required
                        ></input>
                        <p/>
                        <input className="form-control"
                               type="text"
                               value={priority}
                               placeholder="Priority"
                               onChange={(e) => setPriority(e.target.value)}
                        ></input>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">Add</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
