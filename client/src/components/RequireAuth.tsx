import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
const RequireAuth = ({ allowedRoles }:{allowedRoles:number[]}) => {
    const { auth } = useAuth();
    console.log(auth)
    const location = useLocation();
const decoded = jwtDecode<JwtPayload>(auth?.token as string) as any;
console.log(decoded);
    return (
        decoded?.UserInfo.roles?.find((role:number) => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.token //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;