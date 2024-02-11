
import React from 'react'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'

const SubNavbar = () => {
  return (
    <div className=" relative flex items-center p-4 w-full h-12 bg-slate-500 text-white">
    <div className="w-content flex flex-row  items-center justify-between">
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
    </div>
    
  </div>
  )
}

export default SubNavbar