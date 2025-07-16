import React from 'react'
import AuthService from '../services/Auth';
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../store/AuthSlice';

const LogoutBtn = () => {
    let dispatch = useDispatch();

    async function HandleLogOut() {
        try {
            let response = await AuthService.Logout();
            if(response) {
                dispatch(logout());
            }
        } catch (error) {
            console.log("An Error Occured : ",error);
        }
    }

  return (
    <button className='bg-black text-white py-2 px-3 font-bold rounded-xl cursor-pointer' onClick={HandleLogOut}>Log Out</button>
  )
}

export default LogoutBtn