import {Outlet, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import AuthContext from "./AuthProvider";
import moment from "moment";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    let {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const localStorageData = localStorage.getItem("token");
    const token = JSON.parse(localStorageData)

    useEffect(() => {
        let isMounted = true;

        const getToken = async () => {
            try {
                const accessToken = token.token;
                const role = token.role;
                const id = token.id;
                await setAuth({accessToken, role, id});
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? getToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    setInterval(function(){
        if (moment(token?.expirationTime).toDate() < moment(Date.now()).toDate()) {
            navigate("/login")
            window.location.reload()
        }},10000);

    return (
        <>
            {auth?.accessToken
                ? <Outlet/>
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet/>
            }
        </>
    )
}
export default PersistLogin
