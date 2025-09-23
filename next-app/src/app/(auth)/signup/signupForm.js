"use client";

import { displayStyles, textStyles, bg_fg_color, Styles } from "@/app/_components/styles.js";
import { cn } from "@/lib/utils";

import { toast } from "sonner"
import { Ban } from 'lucide-react';

import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";

export function SignupForm({ signupAction }) {

   const [error, setError] = useState(false)

   const toastStyles = new Styles().border().addProps({
      backgroundColor: "var(--destructive)",
      color: "var(--background)",
   }).build()
   function handleSubmit(e) {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const name = formData.get("name").trim()
      const email = formData.get("email").trim()
      const password = formData.get("password").trim()

      if (!name || !email || !password) {
         e.preventDefault();
         setError(true);
         toast.error("Invalid input", {
            icon: <Ban className="w-4 h-4 text-background" />,
            description:
               <div style={{ color: "var(--accent)", opacity: "100" }}>
                  name, email and password must not be empty
               </div>,
            action: {},
            style: toastStyles
         })
         return;
      }

      if (!email.includes("@")) {
         e.preventDefault();
         setError(true);
         toast.error("Invalid input", {
            icon: <Ban className="w-4 h-4 text-background" />,
            description:
               <div style={{ color: "var(--accent)", opacity: "100" }}>
                  email is not valid
               </div>,
            action: {},
            style: toastStyles,
            action: {},
         })
         return;
      }

      if (password.includes(' ')) {
         e.preventDefault();
         setError(true);
         toast.error("Invalid input", {
            icon: <Ban className="w-4 h-4 text-background" />,
            description:
               <div style={{ color: "var(--accent)", opacity: "100" }}>
                  password cannot contain spaces
               </div>,
            action: {},
            style: toastStyles,
            action: {},
         })
         return;
      }

      if (password.length < 8) {
         e.preventDefault();
         setError(true);
         toast.error("Invalid input", {
            icon: <Ban className="w-4 h-4 text-background" />,
            description:
               <div style={{ color: "var(--accent)", opacity: "100" }}>
                  password must be atleast 8 characters
               </div>,
            action: {},
            style: toastStyles,
            action: {},
         })
         return;
      }

      setError(false);
   }

   async function handleSignup(formData) {
      const result = await signupAction(formData)

      if (!result.success) {
         toast.error("Error Signing Up", {
            icon: <Ban className="w-4 h-4 text-background" />,
            description:
               <div style={{ color: "var(--accent)", opacity: "100" }}>
                  {result.error}
               </div>,
            action: {},
            style: toastStyles
         })
      }
   }

   return (
      <div className={`${displayStyles.flex_col_center} p-4 mx-auto`}>

         <form noValidate={true} onSubmit={handleSubmit} action={handleSignup} className={cn(displayStyles.flex_col_center, 'items-start flex-1 gap-4', 'bg-background rounded-xl shadow text-foreground max-w-[20rem] p-4', textStyles.text_h6)}>
            <div className={cn(displayStyles.flex_col_center, 'items-start', 'w-full gap-1')}>
               <div className={` font-semibold ${textStyles.text_h5}`}>
                  Create Account
               </div>
               <div className="text-xs text-muted-foreground">
                  Enter your name email and passowrd below to create an account
               </div>
            </div>

            <div className={cn(displayStyles.flex_col_center, 'items-start', 'w-full gap-2')}>
               <label className="font-medium">Full Name</label>
               <input type="text"
                  name="name"
                  placeholder="full name"
                  required
                  className="w-full border px-3 py-1 rounded-sm shadow-xs" />
            </div>
            <div className={cn(displayStyles.flex_col_center, 'items-start', 'w-full gap-2')}>
               <label className="font-medium">Email</label>
               <input type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full border px-3 py-1 rounded-sm shadow-xs " />
            </div>
            <div className={cn(displayStyles.flex_col_center, 'items-start', 'w-full gap-2')}>
               <label className="font-medium">Password</label>
               <input type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder=""
                  className="w-full border px-3 py-1 rounded-sm shadow-xs" />
            </div>
            <div className={`w-full place-self-center `}>
               <SubmitButton />
            </div>
            <div className={`w-full place-self-start text-xs text-muted-foreground`}>
               already have an account?
               {/* have to replace <a> with <Link> element */}
               <a href="/login" className="underline text-foreground font-medium">
                  log in
               </a>
            </div>
         </form>
      </div>
   )
}

const SubmitButton = () => {

   const { pending } = useFormStatus()
   return (
      <button type="submit" className={`w-full h-9 rounded-sm py-2 leading-none ${displayStyles.flex_row_center} bg-foreground text-background hover:bg-accent-foreground hover:text-accent active:bg-accent-foreground active:text-accent  disabled:opacity-50`}
         disabled={pending}>
         Signup
      </button>
   )
}