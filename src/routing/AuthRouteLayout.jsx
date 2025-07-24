import React from 'react'
import Footer from '../components/Footer'

const AuthRouteLayout = ({children}) => {
  return (
    <>
        <div className='bg-gray-800 h-20 flex items-center justify-center'>
            <h1 className='font-bold text-orange-500 text-4xl cursor-pointer'>Blogify</h1>
        </div>
        {children}
        <Footer />
    </>
  )
}

export default AuthRouteLayout