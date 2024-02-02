import { useState } from 'react'
import './App.css'
import Navigation from './contexts/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='bg-gray-100 h-[100vh]'>
      <ToastContainer />
      <Navigation />
    </div>
  )
}

export default App
