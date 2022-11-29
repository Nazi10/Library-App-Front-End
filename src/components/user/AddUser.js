import {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {faUserPlus} from '@fortawesome/fontawesome-free-solid'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useRef} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import Select from "react-select";

export const AddUser = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState("");
    const [email, setEmail] = useState("");

    const effectRan = useRef(false)
    const [roles, setRoles] = useState([]);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

    const handleSubmit = event => {
        const user = {name, bio, username, email, password, roleId};
        protectedAxios.post(`/api/user/addUser`, user, {
            signal: controller.signal,
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        })
    }

    useEffect(() => {
        if (effectRan.current === false) {
            effectRan.current = true
            protectedAxios.get(`/api/role/getAll`, {
                signal: controller.signal
            }).then(function
                (response) {
                setRoles(response.data)
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [])

    let roleOptions = roles.map(role => ({label: role.name, value: role.id}))

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <FontAwesomeIcon icon="fa-user-plus"></FontAwesomeIcon> Add User
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
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
                               value={bio}
                               placeholder="Bio"
                               onChange={(e) => setBio(e.target.value)}
                        ></input>
                        <p/>
                        <input className="form-control"
                               type="text"
                               value={username}
                               placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)}
                               required
                        ></input>
                        <p/>
                        <input className="form-control"
                               type="text"
                               value={email}
                               placeholder="Email"
                               onChange={(e) => setEmail(e.target.value)}
                               required
                        ></input>
                        <p/>
                        <input className="form-control"
                               type="text"
                               value={password}
                               placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}
                               required
                        ></input>
                        <p/>
                        <Select
                            required
                            options={roleOptions}
                            placeholder="Select Role"
                            onChange={(e) => setRoleId(e.value)}/>
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
