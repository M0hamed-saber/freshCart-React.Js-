import React from 'react'
import foundImage from '../../../assets/images/error.svg'
export default function Notfound() {
  return <>
  <div className='container flex justify-center items-center mx-auto text-center'>
    <img src={foundImage} className='w-full max-w-xs md:max-w-md lg:max-w-lg imageerror' alt="Error Image" />
  </div>
  </>
}
