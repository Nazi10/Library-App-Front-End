import {useState,useEffect} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from '@fortawesome/fontawesome-free-solid'

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
        const id = book.id
        const updateBook = {id, name, description, photo, authorId, categoriesIds};
        const formData = new FormData();
        formData.append('Id', book.id)
        formData.append('AuthorId', updateBook.authorId)
        for (let i=0; i< updateBook.categoriesIds.length; i++) {
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

    const onChangeCategory = (e) => {
        if (!categoriesIds.includes(e)) {
            categoriesIds.push(e)
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
                               value={''}
                               placeholder="photo"
                               onChange={(e) => setPhoto(e.target.files[0])}
                        ></input>
                        <p/>
                        <select className="form-select"
                                onChange={(e) => onChangeCategory(e?.target?.value)}
                                multiple>
                            {categories.map(category => <option value={category.id} key={category.id}>
                                {category.name}
                            </option>)}
                        </select>
                        <p/>
                        <select className="form-select"
                                onChange={(e) => setAuthorId(e.target.value)}
                                value={authorId}>
                            {authors.map(author => <option value={author.id} key={author.id}>
                                {author.name}
                            </option>)}
                        </select>
                        <p/>
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
