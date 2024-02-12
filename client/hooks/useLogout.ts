
import { instance } from "../api/instance";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({token:null});
        try {
            const response = await instance(({
                url:'/users/signout',
                method:'GET',
                headers:{
                  'Content-Type':'application/json',
                 
                },
               }
               ));
               console.log(response)
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout