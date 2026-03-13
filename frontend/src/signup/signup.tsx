"use client"

import { useState, useEffect } from "react"
import { Button, Input, Field } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"

export default function SignupPage(){


   const [name,setName] = useState("")
   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)

   const validateInput = () => {

      if(!name.trim()){
         return "Name is required"
      }

      if(!email.includes("@")){
         return "Invalid email"
      }

      if(password.length < 6){
         return "Password must be at least 6 characters"
      }

      return null
   }

   const signupButtonHandler = async () => {

      const validationError = validateInput()

      if(validationError){
         setError(validationError)
         return
      }

      setLoading(true)
      setError("")

      try{

         const res = await fetch("http://localhost:5001/auth/signup",{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
               name,
               email,
               password
            })
         })

         const data = await res.json()

         if(!res.ok){
            if(data.errortype === "USER_EXISTS"){
               console.error(data.error)
               setError(data.error)
               setTimeout(()=>{

               }, 2000)
               return
            }
            setError(data.error || "Signup failed")
            return
         }

         // cookie is automatically stored by browser

      }catch(err){
         setError("Server error")
      }

      setLoading(false)
   }

   return(
      <div className="container w-screen h-screen flex items-center justify-center">

         <div className="signup-card flex flex-col items-center justify-center gap-4 rounded-lg border p-8">

            <h1 className="text-2xl font-bold">Create Account</h1>

            <Input
               placeholder="name"
               value={name}
               onChange={(e)=>setName(e.target.value)}
            />

            <Input
               placeholder="me@example.com"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
            />

            <PasswordInput
               placeholder="password"
               value={password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            />

            {error && (
               <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button
               className="w-full"
               loading={loading}
               onClick={signupButtonHandler}
            >
               Signup
            </Button>

         </div>
      </div>
   )
}