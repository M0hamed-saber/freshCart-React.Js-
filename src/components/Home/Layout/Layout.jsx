import React,{ useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

export default function Layout() {
  let {setUserData} = useContext(UserContext);
  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('userToken')){
      setUserData(localStorage.getItem('userToken'))
    }
    else{
      navigate('/login')
    }
  },[])


    return <>
      <Navbar/>
      <div className='lg:pt-24'>
      <Outlet></Outlet>
      </div>
      <Footer/>
    </>
}
