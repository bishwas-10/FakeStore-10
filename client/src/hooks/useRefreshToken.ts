import { instance } from "../api/instance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await instance({
      url: "/refresh",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // get('/users/refresh', {
    //     withCredentials: true
    // });
    console.log(response);
    setAuth({token:response.data.accessToken});
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
