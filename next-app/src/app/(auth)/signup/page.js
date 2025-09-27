import { SignupForm } from "./signupForm";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// redirect if user already logged in 
import { isUserValidAction } from "@/app/server/validateUser.js";

export default async function Signup() {

   const res = await isUserValidAction()
   if (res !== false) {
      redirect('/')
   }

   async function signup(formData) {
      "use server";

      const name = formData.get("name")
      const email = formData.get("email");
      const password = formData.get("password");

      console.log('Email: ', email)
      console.log('Password: ', password)
      try {
         const res = await fetch('http://localhost:8000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password }),
            cache: 'no-store'
         })
         const setCookieHeader = res.headers.get("set-cookie");

         if (res.status === 201 && setCookieHeader) {

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
               message: body.message
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
      <SignupForm signupAction={signup} />
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

// Example usage:
// const raw = "demo-cookie=demo-cookie-123; Max-Age=86400; Path=/; Expires=Wed, 24 Sep 2025 02:50:55 GMT; HttpOnly; SameSite=Strict";
// console.log(parseSetCookie(raw));
