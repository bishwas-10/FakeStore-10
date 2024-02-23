import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();

  const location = useLocation();

  if (auth.token) {
    const decoded = jwtDecode<JwtPayload>(auth?.token as string) as any;
    
console.log(decoded)
    if (decoded) {
      return decoded.UserInfo.roles.find((role: number) =>
        allowedRoles?.includes(role)
      ) ? (
        <Outlet />
      ) : auth?.token ? ( 
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      );
    }else{
     return <Navigate to="/login" state={{ from: location }} replace />;
 
    }
  } else {
  return  <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
