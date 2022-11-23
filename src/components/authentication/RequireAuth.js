import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useContext} from "react";
import AuthContext from "./AuthProvider";

export const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        allowedRoles?.includes(auth?.role)
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
