import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import Select from "react-select";

export const AddBook = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState('');

    const [authorId, setAuthorId] = useState("");
    const [categoriesIds, setCategoriesIds] = useState([]);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        protectedAxios.get(`/api/user/getAuthors`, {
            signal: controller.signal,
        }).then(function
            (response) {
            setAuthors(response.data)
        }).catch(function (error) {
            console.log(error);
        });
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
        const book = {name, description, photo, authorId, categoriesIds};
        const formData = new FormData();
        console.log(formData)
        formData.append('AuthorId', book.authorId)
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
            let array = []
            e.forEach(e => array.push(e.value))
            setCategoriesIds(array)
        }
    }

    let categoryOptions = categories.map(category => ({label: category.name, value: category.id}))
    let authorOptions = authors.map(author => ({label: author.name, value: author.id}))

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
                               required
                               value={name}
                               placeholder="Name"
                               onChange={(e) => setName(e.target.value)}
                        ></input>
                        <p/>
                        <input className="form-control"
                               type="text"
                               value={description}
                               placeholder="Description"
                               onChange={(e) => setDescription(e.target.value)}
                        ></input>
                        <p/>
                        <label>Select Book Cover</label>
                        <input className="form-control-file"
                               required
                               type="file"
                               defaultValue={(e) => e.target.files[0]}
                               onChange={(e) => setPhoto(e.target.files[0])}
                        ></input>
                        <p/>
                        <Select
                            options={categoryOptions}
                            placeholder="Select categories"
                            onChange={onChangeCategory}
                            isMulti
                            closeMenuOnSelect={false}
                            required/>
                        <p/>
                        <Select
                            required
                            options={authorOptions}
                            placeholder="Select Author"
                            onChange={(e) => setAuthorId(e.value)}/>
                        <br/>
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
