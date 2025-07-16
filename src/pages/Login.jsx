import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import AuthService from '../services/Auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';

const Login = () => {
  let {register,
      handleSubmit,
      formState : {errors}
  } = useForm();
  let navigate = useNavigate()
  let dispatch = useDispatch();
  let [error,setError] = useState("");

  async function GetLogedIn(data) {
    setError("");
    try {
      let response = await AuthService.Login(data);
      if(response) {
        let resp = await AuthService.GetCurrentUser();
        if(resp) {
          dispatch(login(resp));
          navigate("/");
        }
      }
    } catch (error) {
      if(error.code === 401) {
        setError("Invalid Credentials");
      }
      else {
        setError("Something Went Wrong");
      }
    }
  }

  return (
    <>
        <div className='flex h-[50vh] bg mt-10 justify-center'>
            <form onSubmit={handleSubmit(GetLogedIn)} className='border-2 border-blue-500 flex flex-col w-[30%] h-[100%] items-center justify-center gap-3 rounded-2xl p-3'>
                <h1 className='font-bold text-blue-500 text-3xl'>Sign In</h1>

                <input
                 className='border-2 border-blue-500 outline-none px-[13%] py-2 rounded-xl'
                 type="text"
                 placeholder='Email'
                 {...register("email",{
                    required : "Email is Required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                 })}/>
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                <input
                 className='border-2 border-blue-500 outline-none px-[13%] py-2 rounded-xl'
                 type="text" 
                 placeholder='Password'
                 {...register("password",{
                    required : "Password is Required",
                    minLength : {
                      value : 8,
                      message : "Password Must Be Atleast 8 Characters"
                    }
                 })}/>
                 {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                 <div className='flex items-center justify-center gap-2'>
                    <p className='text-gray-500 font-bold'>If You Don't Have Account Already</p>
                    <Link to="/Signup" className='font-bold text-blue-500 underline'>Sign In</Link>
                 </div>

                 {error && <p className='text-red-500'>{error}</p>}

                 <button type='submit' className='bg-blue-500 font-bold text-white py-2 px-[5%] rounded-xl cursor-pointer hover:bg-white hover:text-blue-500 hover:outline-2 hover:outline-blue-500'>Sign In</button>
            </form>
        </div>
    </>
  )
}

export default Login