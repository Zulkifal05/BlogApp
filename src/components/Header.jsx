import React from 'react'
import { NavLink , Link, useLocation } from "react-router-dom"
import LogoutBtn from "./LogoutBtn"

const Header = () => {
  let location = useLocation();

  return (
    <div className='bg-gray-800 h-20 flex items-center justify-evenly'>
      <div className='flex justify-center items-center grow-1'>
           <Link to="/">
              <h1 className='font-bold text-orange-500 text-4xl cursor-pointer'>Blogify</h1>
           </Link>
      </div>
      {location.pathname !== "/Login" && 
      <div className='grow-2 flex items-center justify-evenly text-white font-bold text-xl'>
          {location.pathname !== "/My-Posts" && <NavLink to="/My-Posts">
            <button className='cursor-pointer hover:text-orange-300'>My Posts</button>
          </NavLink>}
          {location.pathname !== "/Create-Post" && <NavLink to="/Create-Post" >
            <button className='cursor-pointer hover:text-orange-300'>Create Post</button>
          </NavLink>}
          <div className='flex justify-center items-center'>
            <LogoutBtn />
          </div>
      </div>}
    </div>
  )
}

export default Header