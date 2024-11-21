import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export default function Loading() {
    return <>
        <ThreeCircles
    visible={true}
    height="80"
    width="100"
    color="black"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
        />
    </> 
}
