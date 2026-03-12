"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
   id: string
   name: string
   email: string
}

interface AuthContextType {
   user: User | null
   loading: boolean
   refreshUser: () => Promise<void>
   logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

   const [user,setUser] = useState<User | null>(null)
   const [loading,setLoading] = useState(true)

   const refreshUser = async () => {
      try{

         const res = await fetch("http://localhost:8000/auth/me",{
            credentials:"include"
         })

         if(!res.ok){
            setUser(null)
            return
         }

         const data = await res.json()
         setUser(data.user)

      }catch(err){
         setUser(null)
      }finally{
         setLoading(false)
      }
   }

   const logout = async () => {

      await fetch("http://localhost:8000/auth/logout",{
         method:"POST",
         credentials:"include"
      })

      setUser(null)
   }

   useEffect(()=>{
      refreshUser()
   },[])

   return (
      <AuthContext.Provider value={{user,loading,refreshUser,logout}}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth(){
   const ctx = useContext(AuthContext)

   if(!ctx){
      throw new Error("useAuth must be used inside AuthProvider")
   }

   return ctx
}