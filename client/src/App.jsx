import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { Button, useColorMode } from "@chakra-ui/react"

// Pages
import Login from './Pages/1.LOGIN_SIGNUP/Login'
import Home from './Pages/2.HOME/Home'
import Chat from './Pages/3.CHAT/Chat'

const App = () => {
  // const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App