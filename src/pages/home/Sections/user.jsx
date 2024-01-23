import React, { useRef, useState, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { toast } from 'react-toastify'

const UserDetails = () => {

    const { userData, updatePassword, updateEmail } = useContext(AppContext)

    if (!userData) {
        return (<>
            <h3 className="text-xl">Loading your personal data.....</h3>
        </>)
    }
    const passwordRef = useRef()
    const emailRef = useRef()

    const handleNewPass = () => {
        const newPass = passwordRef.current.value;

        if (newPass.length < 16) {
            toast("Your new password must be at least 16 characters long");
            return;
        }

        updatePassword(newPass);
        toast("Password Updated!")
    };


    const handleNewEmail = () => {
        const newEmail = emailRef.current.value;
    
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(newEmail)) {
            toast("Please enter a valid email address");
            return; 
        }

        updateEmail(newEmail);
        toast("Email Updated!")

    };






    return (
        <div className="flex flex-col w-full gap-4">
            <h1 className='text-3xl font-bold'>User Details</h1>


            <form action="" onSubmit={handleNewEmail} className='bg-gray-50 rounded w-full flex flex-col gap-5 lg:w-1/2 p-5'>
                <h3>Update Your Email</h3>
                <div className="mb-5 w-full flex flex-col">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" ref={emailRef} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="someone@gmail.com" required />
                </div>

                <button type="submit" className="text-black bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Update</button>

            </form>

            <form action="" onSubmit={handleNewPass} className='bg-gray-50 rounded w-full flex flex-col gap-5 lg:w-1/2 p-5'>
                <h3>Update Your password</h3>

                <div className="mb-5 w-full flex flex-col">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" ref={passwordRef} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-black bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Update</button>

            </form>

        </div>
    )
}

export default UserDetails