import { useContext, useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { UserContext } from './Components/Context/UserContext'

function App() {
  // const [user,setToken] = useContext(UserContext)
  return (
    <>
      <BrowserRouter>
        {/* <nav className='main-navBar'>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav> */}
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
