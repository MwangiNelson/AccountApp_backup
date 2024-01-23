import React, { useContext, useReducer, useRef } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { Link } from 'react-router-dom'

const Login = () => {
    const { login,userData } = useContext(AppContext)

    const passwordRef = useRef()
    const emailRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        login(email,password)

        console.log(userData)
    }

    return (
        <div className="flex flex-col w-full justify-center items-center py-10 gap-5 rounded border bg-gray-100">
            <h3>Login</h3>

            <form
            onSubmit={handleLogin}
            className="md:w-3/4 w-7/12 lg:w-1/3 mx-auto">
                <div className="mb-5 w-full flex flex-col">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" ref={emailRef} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5 w-full flex flex-col">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" ref={passwordRef} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-start mb-5 w-full text-sm">
                    <p className=''>Dont have an account? <Link to={'/sign-up'} className='text-blue-500'> Sign Up here
                    </Link></p>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}

export default Login