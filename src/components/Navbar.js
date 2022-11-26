import {Button, Container, Modal, Nav, Navbar as NavbarBs} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom"
import {useContext, useState} from "react";
import AuthContext from "./authentication/AuthProvider";
import useLogout from "./authentication/useLogout";

export const Navbar = () => {
    const {auth} = useContext(AuthContext);
    const logout = useLogout();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const signOut = async () => {
        await logout();
        navigate('/login')
        handleClose()
        window.location.reload()
    }

    if (auth.role === "Admin") {
        return (
            <NavbarBs sticky="top" className="bg-light shadow-sm mb-3">
                <Container>
                    <Nav>
                        <Nav.Link to="/" as={NavLink}>
                            <img src={require("../assets/digital-library.png")} height="45"/> |
                        </Nav.Link>
                        <Nav.Link to="/book" as={NavLink} className="d-flex align-items-center ">
                            Books <img src={require("../assets/book.png")} height="18"/>
                        </Nav.Link>
                        <Nav.Link to="/author" as={NavLink} className="d-flex align-items-center">
                            Authors <img src={require("../assets/icons8-writer-male-96.png")} height="18"/>
                        </Nav.Link>
                        <Nav.Link to="/category" as={NavLink} className="d-flex align-items-center">
                            Categories <img src={require("../assets/categories.png")} height="18"/>
                        </Nav.Link>
                        <Nav.Link to="/user" as={NavLink} className="d-flex align-items-center">
                            Users <img src={require("../assets/user.png")} height="18"/>
                        </Nav.Link>
                        <Button className="btn-danger position-relative start-100" onClick={handleShow}>
                            Sign Out
                        </Button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Are you sure you want to sign out?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant={"danger"} onClick={signOut}>
                                    Sign Out
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Nav>
                </Container>
            </NavbarBs>
        )
    }
    return (
        <NavbarBs sticky="top" className="bg-light shadow-sm mb-3">
            <Container>
                <div>
                    <img src={require("../assets/bookstore.png")}
                         height={70}/>
                    <h5> Library App</h5>
                </div>
                <div>
                    <Button className="btn-danger position-relative start-100" onClick={handleShow}>
                        Sign Out
                    </Button>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to sign out?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant={"danger"} onClick={signOut}>
                            Sign Out
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </NavbarBs>
    )
}
