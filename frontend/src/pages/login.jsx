import './login.css';
import appLogo from '../assets/chat-app-logo.svg';

import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import toast from 'react-hot-toast';

function Login() {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });
   const { isLoggingIn, login } = useAuthStore();
   const validateForm = () => {
      if (!formData.email.trim()) return toast.error('Email is required');
      if (!formData.password) return toast.error('Password is required');
      if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid');
      return true;
   }
   const handleSubmit = (e) => {
      e.preventDefault();
      const success = validateForm();
      if (success === true) {
         login(formData);
      }
   }
   return (
      <>
         <div className="login-form-container">
            <img src={appLogo} alt="Chat App Logo" className='app-logo' />
            <h1>Welcome Back</h1>
            <h2>Login to your account</h2>
            <form className='login-form' onSubmit={handleSubmit}>
               <div className='form-group'>
                  <label htmlFor="username">Email</label>
                  <input type="email" id="username" name="username" placeholder='user@email.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
               </div>
               <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder='123456' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
               </div>
               <div className='form-group'>
                  <input className="submit-button" type="submit" value="Login" disabled={isLoggingIn} />
                  <p>Don't have an account? <a href="/signup">signup</a></p>
               </div>
            </form>
         </div>
      </>
   )
}
export default Login