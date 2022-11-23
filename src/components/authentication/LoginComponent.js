import {useContext, useEffect, useRef, useState} from "react";
import axios from "../../api/axios";
import {useNavigate, useLocation} from 'react-router-dom';
import AuthContext from "./AuthProvider";

export const LoginComponent = () => {

    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://localhost:7196/api/authentication/login`,
                JSON.stringify({email, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            localStorage.setItem("token", JSON.stringify(response.data))
            const role = response?.data?.role;
            const id = response?.data?.id;
            setAuth({accessToken, role ,id});
            if (role === "Author"){
                navigate(`/authorProfile/${id}`)
            }
            else navigate(from, {replace: true});
            setEmail('');
            setPassword('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    ></input>
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <p/>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        </section>
    )
}
