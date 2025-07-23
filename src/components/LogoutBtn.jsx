import React from 'react'
import AuthService from '../services/Auth';
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { removePosts } from '../store/PostsSlice';

const LogoutBtn = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    async function HandleLogOut() {
        try {
            let response = await AuthService.Logout();
            if(response) {
                dispatch(logout());
                dispatch(removePosts());
                navigate("/Signup")
            }
        } catch (error) {
            console.log("An Error Occured : ",error);
        }
    }

  return (
    <button className='bg-red-500 text-white py-2 px-3 font-bold rounded-xl cursor-pointer hover:outline-2 hover:outline-red-500 hover:text-red-500 hover:bg-gray-800' onClick={HandleLogOut}>Log Out</button>
  )
}

export default LogoutBtn