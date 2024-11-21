import React from 'react'

export default function Footer() {
    return <>
<div className='bg-gray-100 max-h-screen pt-24'>
    <div className='container mx-auto px-4'>
        <h4 className='text-2xl font-extralight'>Get The FreshCart App</h4>
        <p className='text-slate-400'>
            We will send you a link. Open it on your phone to download the app.
        </p>
        
        <div className='pt-5'>
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
                <input 
                    type="email" 
                    id="email" 
                    className="w-full md:w-auto flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Email" 
                    required 
                />
                <button 
                    type="button" 
                    className=" md:pt-0 focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full md:w-48"
                >
                    Share App Link
                </button>
            </div>
            
            <hr />
            
            <div className='flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-5'>
                <h5 className='py-5 text-lg'>Payment Partners</h5>
                <div className='py-5 flex space-x-5 text-green-700 text-2xl'>
                    <i className="fa-brands fa-apple-pay"></i>
                    <i className="fa-brands fa-google-pay"></i>
                    <i className="fa-brands fa-cc-paypal"></i>
                </div>
            </div>
        </div>
    </div>
</div>

</>
}
