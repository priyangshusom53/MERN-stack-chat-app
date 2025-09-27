'use server';

import { cookies } from "next/headers";

export const isUserValidAction = async () => {
   const cookieStore = await cookies()
   const authCookie = cookieStore.get('sessionId')
   console.log(`isUserValid Action: cookie value: ${authCookie?.value}`)
   try {
      const res = await fetch("http://localhost:8000/auth/check-user", {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Cookie: `sessionId=${authCookie?.value}`,
         },
         cache: 'no-store'
      })
      const data = await res.json()
      console.log(`isUSerValid Action: ${data.status}`)
      if (data.status === 'valid') return { valid: true, user: data.user }
      return false
   } catch (err) {
      console.log(err.message)
      return false
   }

}