import { LoginForm } from "./loginForm.js";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// redirect if user already logged in 
import { isUserValidAction } from "@/app/server/validateUser.js";

export default async function Login() {
   const res = await isUserValidAction()
   if (res !== false) {
      redirect('/')
   }

   async function login(formData) {
      "use server";

      const email = formData.get("email");
      const password = formData.get("password");

      console.log('Email: ', email)
      console.log('Password: ', password)
      try {
         const res = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
            cache: 'no-store'
         })
         const setCookieHeader = res.headers.get("set-cookie");
         console.log(`login page: ${setCookieHeader}`)
         if (res.status === 200 && setCookieHeader) {

            const cookieProps = parseSetCookie(setCookieHeader)
            console.log(cookieProps)
            const cookieStore = await cookies();
            cookieStore.set({
               name: cookieProps.name,
               value: cookieProps.value,
               httpOnly: cookieProps.httponly,
               secure: cookieProps.secure,
               path: cookieProps.path,
               maxAge: cookieProps['max-age'] ? parseInt(cookieProps["max-age"], 10) : undefined,
               sameSite: cookieProps.samesite,
               expires: cookieProps.expires ? new Date(cookieProps.expires) : undefined
            });
            const body = await res.json()
            return {
               success: true,
               message: body.message,
            }
         }
         else {
            const body = await res.json()
            console.log(body)
            return {
               success: false,
               error: body.message,
            };
         }
      } catch (err) {
         return {
            success: false,
            error: 'Service Unavailable',
         }
      }
   }

   return (
      <LoginForm loginAction={login} />
   )
}


function parseSetCookie(setCookie) {
   const parts = setCookie.split(";").map(p => p.trim());
   const [name, value] = parts[0].split("=");

   const cookie = {
      name,
      value,
   };

   for (let i = 1; i < parts.length; i++) {
      const [k, v] = parts[i].split("=");
      const key = k.toLowerCase();
      if (!(key in cookie)) {
         cookie[key] = v ?? true;
      }
   }

   return cookie;
}