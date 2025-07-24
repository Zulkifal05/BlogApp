import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthService from '../services/Auth'
import { useDispatch } from "react-redux"
import { login , logout } from '../store/AuthSlice'
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
    let {register,
        handleSubmit,
        formState : {errors}
    } = useForm();
    let despatch = useDispatch();
    let navigate = useNavigate();
    let [error,setError] = useState("");

    async function Create(data) {
        setError("");
        
        //Below to check If a session is already active so delete that session
        let alreadyLoginCheck = await AuthService.GetCurrentUser();
        if(alreadyLoginCheck) {
            try {
                let alredayUserResponse = await AuthService.Logout();
                if(alredayUserResponse) {
                    despatch(logout());
                    despatch(removePosts());
                }
            } catch (error) {
                console.log("An Error Occured : ",error);
            }
        }

        try {
            let response = await AuthService.CreateAccount(data);
            if(response) {
                const resp = await AuthService.GetCurrentUser();
                if(resp) despatch(login(resp));
                navigate("/");
            }
        } catch (error) {
            if(error.code === 409) {
                setError("User Already Exists");
            }
            else {
                setError("Something Went Wrong");
            }
        }
    }

  return (
    <>
        <div className='flex h-[70vh] bg mt-10 justify-center'>
            <form onSubmit={handleSubmit(Create)} className='border-3 border-gray-800 flex flex-col w-[25%] h-[100%] items-center justify-center gap-3 rounded-2xl p-3'>
                <h1 className='font-bold border-gray-800 text-3xl'>Sign Up</h1>
                
                <input
                 className='border-2 border-gray-800 outline-none px-[13%] py-2 rounded-xl'
                 type="text"
                 placeholder='Name'
                 {...register("name",{
                    required : "Name is Required",
                 })}/>
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

                <input
                 className='border-2 border-gray-800 outline-none px-[13%] py-2 rounded-xl'
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
                 className='border-2 border-gray-800 outline-none px-[13%] py-2 rounded-xl'
                 type="password" 
                 placeholder='Password'
                 {...register("password",{
                    required : "Password is required",
                    minLength : {
                        value : 8,
                        message : "Password Must Be Atleast 8 Characters"
                    }
                 })}/>
                 {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                 <div className='flex items-center justify-center gap-2'>
                    <p className='text-gray-500 font-bold'>If Already Have Account then</p>
                    <Link to="/Login" className='font-bold border-gray-800 underline'>Sign In</Link>
                 </div>

                 {error && <p className='text-red-500'>{error}</p>}

                 <button type='submit' className='bg-gray-800 font-bold text-white py-2 px-[5%] rounded-xl cursor-pointer hover:bg-white hover:text-gray-800 hover:outline-2 hover:border-gray-800'>Create Account</button>
            </form>
        </div>
    </>
  )
}

export default Signup