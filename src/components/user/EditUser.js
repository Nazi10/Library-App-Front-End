import {useState, useRef,useEffect} from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from '@fortawesome/fontawesome-free-solid'

export const EditUser = ({user}) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [roleId, setRoleId] = useState(user.roleId);
    const [email, setEmail] = useState(user.email);

    const effectRan = useRef(false)
    const [roles, setRoles] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const protectedAxios = useAxiosPrivate();
    const controller = new AbortController();

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

    const handleSubmit = event => {
        let id = user.id
        const updateUser = {id, name, bio, username, email, password, roleId};
        protectedAxios.put(`/api/user/updateUser`, updateUser, {
            signal: controller.signal,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateUser)
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
                    <Modal.Title>Edit {user.name}?</Modal.Title>
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
                        <select className="form-select"
                                onChange={(e) => setRoleId(e.target.value)}
                                value={roleId}
                                required>
                            <option value={''} hidden> Select Author </option>
                            {roles.map(role => <option value={role.id} key={role.id}>
                                {role.name}
                            </option>)}
                        </select>
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
