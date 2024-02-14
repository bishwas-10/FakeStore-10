
import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import useLogout from '../../hooks/useLogout'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import useAuth from '../../hooks/useAuth'
const SubNavbar = () => {
  const logout = useLogout();
  const {auth}= useAuth();
  const logOut =()=>{
    logout().then(()=>toast.success("Sign Out successfully", {
    position: "top-center",
    autoClose: 2000,
  })
  );
   
    
  }
  return (
    <div className=" relative flex items-center p-6 w-full h-12 bg-slate-800 text-white">
    <div className="w-content flex flex-row  items-center ">
    <SideBar/>
      <Link
        to="#"
        className="px-3 py-2  md:font-small hover:border-white hover:border-2 transition-all duration-75"
      >
        Today&apos;s Deal
      </Link>
      <Link
        to="#"
        className="px-3 py-2  md:font-small hover:border-white hover:border-2 transition-all duration-75"
      >
        Customer Service
      </Link>
      <Link
        to="#"
        className="px-3 py-2 text-sm md:font-small hover:border-white hover:border-2 transition-all  duration-75"
      >
        Sell
      </Link>
      <Link
        to="#"
        className="px-3 py-2 text-sm  md:font-small hover:border-white hover:border-2 transition-all  duration-75 "
      >
        Gift Cards
      </Link>
      <Link
        to="/admin"
        className="px-3 py-2 text-sm  md:font-small hover:border-white hover:border-2 transition-all  duration-75 "
      >
       admin
      </Link>
    {auth.token &&   <button
              onClick={logOut}
              className="p-2" 
          
            >
              logout
            </button>}
    </div>
    <ToastContainer />
  </div>
  )
}

export default SubNavbar