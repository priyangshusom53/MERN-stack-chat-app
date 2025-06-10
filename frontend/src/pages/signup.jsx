import './signup.css'
import appLogo from '../assets/chat-app-logo.svg'

import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import toast from 'react-hot-toast'

function Signup() {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
   })
   const { isSigningUp, signup } = useAuthStore()
   const validateForm = () => {
      if (!formData.name.trim()) return toast.error('Name is required')
      if (!formData.email.trim()) return toast.error('Email is required')
      if (!formData.password) return toast.error('Password is required')
      if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long')
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid')
      return true
   }
   const handleSubmit = (e) => {
      e.preventDefault()
      const success = validateForm()
      if (success === true) {
         signup(formData)
      }
   }

   return (
      <>
         <div className="signup-form-container">
            <img src={appLogo} alt="Chat App Logo" className='app-logo' />
            <h1>Create Account</h1>
            <h2>Get started with your free account</h2>
            <form className='signup-form' onSubmit={handleSubmit}>
               <div className='form-group'>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder='user' value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
               </div>
               <div className='form-group'>
                  <label htmlFor="username">Email</label>
                  <input type="email" id="username" name="username" placeholder='user@email.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
               </div>
               <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder='123456' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
               </div>
               <div className='form-group'>
                  <input className="submit-button" type="submit" value="Create account" disabled={isSigningUp} />
                  <p>Already have an account? <a href="/login">login</a></p>
               </div>
            </form>
         </div>
      </>
   )
}
export default Signup;