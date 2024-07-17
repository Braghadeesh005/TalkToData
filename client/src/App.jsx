import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { Button, useColorMode } from "@chakra-ui/react"

// Pages
import Login from './Pages/1.LOGIN_SIGNUP/Login'
import Home from './Pages/2.HOME/Home'

const App = () => {
  // const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App