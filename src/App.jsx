import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const App = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App 