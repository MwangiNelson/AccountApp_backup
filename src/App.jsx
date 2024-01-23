import { useState } from 'react'
import './App.css'
import Navigation from './contexts/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
    </>
  )
}

export default App
