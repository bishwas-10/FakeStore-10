
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useRefreshToken = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth ,auth} = useAuth();
 
//  if(auth.token){
//        const decoded = jwtDecode<JwtPayload>(auth?.token as string) as any;
//       // setUser({username:decoded.UserInfo.username,roles:decoded.UserInfo.roles});
//     }
  return  async () => {
    const response = await axiosPrivate({
      url: "/refresh",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.token}`,
      },
     
    });

    // get('/users/refresh', {
    //     withCredentials: true
    // });
   
    setAuth({token:response.data.accessToken});
   
   
    return response.data.accessToken;
  };
 
};

export default useRefreshToken;
