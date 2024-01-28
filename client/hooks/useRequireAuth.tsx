"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

 const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
  const router = useRouter();
const token = useSelector((state:RootState)=>state.token.token) ;
const userDetails= useSelector((state:RootState)=>state.users.currentUser) ;
  useEffect(() => {
   if(!token && !userDetails){
   
        router.push('/signpage'); // Redirect to the login page
      
}// You should implement your own logic here

    
  }, []);

  return <>{children}</>;
};
export default ProtectedRoute;
// const checkIfLoggedIn = ({token,userDetails}:{token:string,userDetails:SignResultProps}) => {
//   // Implement your logic to check if the user is logged in
//   return true; // Placeholder, replace with your actual logic
// };
