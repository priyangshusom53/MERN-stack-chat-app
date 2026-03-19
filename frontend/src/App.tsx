import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'

// import Signup from './pages/signup.jsx'
import Signup from './signup/signup.js'
import Login from './login/login.js'
import Chat from './pages/chat.jsx'
import { ChatPage } from './chat/page.js'
import Logout from './pages/logout.jsx'
import { useAuthStore } from './store/authStore.js'

import { Toaster } from 'react-hot-toast'
import { MessageWindow } from './chat/messages.js'



// routes setup
const router = createBrowserRouter([
   {
      path:"/login",
      element:<Login/>
   },
   {
      path:"/signup",
      element:<Signup/>
   },
   {
      path:"/",
      element:<ChatPage/>,
      children:[
         {
            path:"chat/:chatId/messages",
            element:<MessageWindow/>
         },
      ]
   }
])

export function ChatApp(){

   const { checkUser } = useAuthStore()
   useEffect(()=>{
      checkUser()
   },[checkUser])

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}


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
