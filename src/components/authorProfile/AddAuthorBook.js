import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../api/useAxiosPrivate";

export const AddAuthorBook = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState('');

    const [categoriesIds, setCategoriesIds] = useState([]);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        protectedAxios.get(`/api/category/getAll`, {
            signal: controller.signal,
        }).then(function
            (response) {
            setCategories(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }, [])

    const handleSubmit = event => {
        const book = {name, description, photo, categoriesIds};
        const formData = new FormData();
        for (let i = 0; i < book.categoriesIds.length; i++) {
            formData.append('CategoriesIds', book.categoriesIds[i]);
        }
        formData.append('Name', book.name)
        formData.append('Description', book.description)
        formData.append('PhotoFile', book.photo)
        protectedAxios.post(`/api/book/add`, formData, {
            signal: controller.signal,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
        });
    }
    const onChangeCategory = (e) => {
        if (!categoriesIds.includes(e)) {
            categoriesIds.push(e)
        }
    }
    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                <FontAwesomeIcon icon="fa-book"></FontAwesomeIcon> Add Book
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={"form"} onSubmit={handleSubmit}>
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
                               value={description}
                               placeholder="Description"
                               onChange={(e) => setDescription(e.target.value)}
                        ></input>
                        <p/>
                        Book Cover:
                        <input className="form-control-file"
                               type="file"
                               defaultValue={(e) => e.target.files[0]}
                               onChange={(e) => setPhoto(e.target.files[0])}
                               required
                        ></input>
                        <p/>
                        <select className="form-select"
                                onChange={(e) => onChangeCategory(e?.target?.value)}
                                multiple
                                required>
                            {categories.map(category => <option value={category.id} key={category.id}>
                                {category.name}
                            </option>)}
                        </select>
                        <p/>
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
