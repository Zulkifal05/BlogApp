import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import AuthService from '../services/Auth';
import { login } from "../store/AuthSlice"
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  let [isLoading,setIsLoading] = useState(true);
  let [renderChild,setRenderChild] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let userloginStatus = useSelector((state) => state.auth.userLoginStatus);

  useEffect(() => {
    async function CheckLogin() {
      setIsLoading(true);
      if(userloginStatus) {  //If user is loggedin in state
        setIsLoading(false);
        setRenderChild(true);
      }
      else {  //If user is loggedin but state not updated
        let userLoginCheck = await AuthService.GetCurrentUser();
        if(userLoginCheck) {
          dispatch(login(userLoginCheck));
          setIsLoading(false);
          setRenderChild(true);
        }
        else {  //If user is not logged in nor state is updated
          setIsLoading(false);
          navigate("/Login" , { replace : true });
        }
      }
    }

    CheckLogin()
  },[children])

  if(isLoading) return <Container>
    <p className='font-bold text-gray-800 text-2xl'>Loading.....</p>
  </Container>

  if(renderChild) return <>
    {children}
  </>
}

export default ProtectedRoute