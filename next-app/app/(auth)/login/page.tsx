"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authContext"
import { Button, Input } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { useAuthStore } from "@/state/authStore"

export default function Loginpage(){


   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)

   const validateInput = () => {

      if(!email.includes("@")){
         return "Invalid email"
      }

      if(password.length < 6){
         return "Password must be at least 6 characters"
      }

      return null
   }

   const router = useRouter()
   const { user, isLoading, checkUser } = useAuthStore()

   useEffect(()=>{
      checkUser()
   }, [])

   useEffect(()=>{
      if(!isLoading && user){
         router.push("/")
      }else if(!isLoading && !user){
         setLoading(false)
      }
   },[isLoading, user])

   const loginButtonHandler = async () => {

      const validationError = validateInput()

      if(validationError){
         setError(validationError)
         return
      }

      setLoading(true)
      setError("")

      try{

         const res = await fetch("http://localhost:8000/auth/login",{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
               email,
               password
            })
         })

         const data = await res.json()

         if(!res.ok){
            setError(data.error || "Login failed")
            return
         }

         // cookie automatically stored
         await checkUser()
         router.push("/")

      }catch(err){
         setError("Server error")
      }

      setLoading(false)
   }

   return(
      <div className="container w-screen h-screen flex items-center justify-center">

         <div className="login-card flex flex-col items-center justify-center gap-4 rounded-lg border p-8">

            <h1 className="text-2xl font-bold">Login to your Account</h1>

            <Input
               placeholder="me@example.com"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
            />

            <PasswordInput
               placeholder="password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
            />

            {error && (
               <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button
               className="w-full"
               loading={loading}
               onClick={loginButtonHandler}
            >
               Login
            </Button>

         </div>

      </div>
   )
}