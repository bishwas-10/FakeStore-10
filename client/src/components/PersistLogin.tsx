import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import useLocalStorage from "../../hooks/useLocalStorage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { auth,setAuth } = useAuth();
    const [persist] = useLocalStorage('persist', true);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                setAuth({token:null});
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        
        !auth?.token  && persist.persist ? verifyRefreshToken() : setIsLoading(false);

        return () =>{ isMounted = false;}
    }, [])


    return (
        <>
             { isLoading 
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin