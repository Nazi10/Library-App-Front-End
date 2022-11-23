import {useContext} from "react";
import AuthContext from "./AuthProvider";

const useLogout = () => {
    const { setAuth } = useContext(AuthContext);

    const logout = async () => {
        setAuth({});
        try {
            localStorage.removeItem("token")
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
