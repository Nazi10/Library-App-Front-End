import {Outlet} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import AuthContext from "./AuthProvider";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    let {auth, setAuth} = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;
        const localStorageData = localStorage.getItem("token");
        const token = JSON.parse(localStorageData)
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
