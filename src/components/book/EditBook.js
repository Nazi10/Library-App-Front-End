import {useState,useEffect} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from '@fortawesome/fontawesome-free-solid'
import Select from "react-select";

export const EditBook = ({book}) => {
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState(book.name);
    const [description, setDescription] = useState(book.description);
    const [photo, setPhoto] = useState(book.photo);

    const [authorId, setAuthorId] = useState(book.authorId);
    const [categoriesIds, setCategoriesIds] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    useEffect(() => {
        protectedAxios.get(`/api/user/getAuthors`,{
            signal: controller.signal,
        }).then(function
            (response) {
            setAuthors(response.data)
        }).catch(function (error) {
            console.log(error);
        });
        protectedAxios.get(`/api/category/getAll`,{
            signal: controller.signal,
        }).then(function
            (response) {
            setCategories(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        const id = book.id
        const updateBook = {id, name, description, photo, authorId, categoriesIds};
        const formData = new FormData();
        formData.append('Id', book.id)
        formData.append('AuthorId', updateBook.authorId)
        for (let i=0; i < updateBook.categoriesIds.length; i++) {
            formData.append('CategoriesIds', updateBook.categoriesIds[i]);
        }
        formData.append('Name', updateBook.name)
        formData.append('Description', updateBook.description)
        formData.append('PhotoFile', updateBook.photo)
        protectedAxios.put(`/api/book/update`, formData, {
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

    let categoryOptions = categories.map(category => ({label: category.name, value: category.id}))
    let authorOptions = authors.map(author => ({label: author.name, value: author.id}))

    const onChangeCategory = (e) => {
        if (!categoriesIds.includes(e)) {
            let array = []
            e.forEach(e => array.push(e.value))
            console.log(array)
            setCategoriesIds(array)
        }
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
                    <Modal.Title>Edit {book.name}</Modal.Title>
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
                               value={description}
                               placeholder="Description"
                               onChange={(e) => setDescription(e.target.value)}
                        ></input>
                        <p/>
                        Book Cover:
                        <input className="form-control-file"
                               type="file"
                               defaultValue={(e) => e.target.files[0]}
                               placeholder="photo"
                               onChange={(e) => setPhoto(e.target.files[0])}
                        ></input>
                        <p/>
                        <Select
                            options={categoryOptions}
                            placeholder="Select categories"
                            onChange={onChangeCategory}
                            isMulti
                            closeMenuOnSelect={false}
                        />
                        <p/>
                        <Select
                            required
                            options={authorOptions}
                            placeholder="Select Author"
                            onChange={(e) => setAuthorId(e.value)}/>
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
