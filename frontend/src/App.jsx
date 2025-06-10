import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import Signup from './pages/signup.jsx'
import Login from './pages/login.jsx'
import Chat from './pages/chat.jsx'
import Logout from './pages/logout.jsx'
import { useAuthStore } from './store/useAuthStore.js'

import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to='/chat' />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/chat' />} />
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to='/login' />} />
        <Route path="/logout" element={!authUser ? <Logout /> : <Navigate to='/chat' />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
