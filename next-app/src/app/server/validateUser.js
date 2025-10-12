'use server';

import { cookies } from "next/headers";

export const isUserValidAction = async () => {
   const cookieStore = await cookies()
   const authCookie = cookieStore.get('sessionId')
   console.log(`isUserValid Action: cookie value: ${authCookie?.value}`)
   try {
      const res = await fetch("http://localhost:8000/api/v1/auth/check-user", {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Cookie: `sessionId=${authCookie?.value}`,
         },
         cache: 'no-store'
      })
      if (res.ok) {
         const body = await res.json()
         console.log(`isUSerValid Action: ${body.message}`)
         return { valid: true, user: body.data }
      }

      return false
   } catch (err) {
      console.error('Error in isUserValid action: ', err.message)
      return false
   }

}