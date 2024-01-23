import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'
import AuthPage from '../pages/authentication/page'
import Login from '../pages/authentication/Login'
import SignUp from '../pages/authentication/SignUp'
import { AppContext } from './AppContext'
import HomePage from '../pages/home/page'

const Navigation = () => {

    const { userData } = useContext(AppContext)
    console.log(userData)

    return (
        <Routes>
            <Route path="/" element={userData ? <HomePage /> : <Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* <Route path='/home' element={userData ? <HomePage /> : <Login />} /> */}
        </Routes>
    )
}

export default Navigation