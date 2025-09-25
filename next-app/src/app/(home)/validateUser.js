'use server';

import { cookies } from "next/headers";

export const isUserValidAction = async () => {
   const cookieStore = await cookies()
   const authCookie = cookieStore.get('sessionId')
   try {
      const res = await fetch("http://localhost:8000/auth/check-user", {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Cookie: `sessionId=${authCookie}`,
         },
         cache: 'no-store'
      })
      const data = await res.json()
      if (data.status === 'valid') return { valid: true, user: data.user }
      return false
   } catch (err) {
      console.log(err.message)
      return false
   }

}