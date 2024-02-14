import { useContext, useDebugValue } from "react";
import AuthContext from "../src/context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.token ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;