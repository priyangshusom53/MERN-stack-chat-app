import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import { data } from 'react-router-dom';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/"

export const useAuthStore = create((set, get) => ({
   authUser: null,
   isSigningUp: false,
   isLoggingIn: false,

   isCheckingAuth: true,
   socket: null,
   checkAuth: async () => {
      try {
         const res = await axiosInstance.get('/auth/check');
         console.log(res.data)
         set({ authUser: res.data });
         get().connectSocket()
      } catch (err) {
         set({ authUser: null });
         console.log('error in checkAuth')
         console.log(err);
      } finally {
         set({ isCheckingAuth: false });
      }
   },
   signup: async (data) => {
      set({ isSigningUp: true });
      try {
         const res = await axiosInstance.post('/auth/signup', data);
         set({ authUser: res.data });
         toast.success('Account created successfully');
         get().connectSocket()
      } catch (err) {
         console.log('error in signup')
         console.log(err);
         toast.error(err.response.data.message);
      } finally {
         set({ isSigningUp: false });
      }
   },
   login: async (data) => {
      set({ isLoggingIn: true });
      try {
         const res = await axiosInstance.post('/auth/login', data);
         set({ authUser: res.data });
         toast.success('Logged in successfully');
         get().connectSocket()
      } catch (err) {
         console.log('error in login')
         console.log(err);
         toast.error(err.response.data.message);
      } finally {
         set({ isLoggingIn: false });
      }
   },
   logout: async () => {
      try {
         await axiosInstance.post('/auth/logout');
         set({ authUser: null });
         toast.success('Logged out successfully');
         get().disconnectSocket()

      } catch (err) {
         console.log(err)
         toast.error(err.response.data.message);
      }

   },
   connectSocket: () => {
      const { authUser } = get()
      if (!authUser || get().socket?.connected) return
      const socket = io(BASE_URL, {
         query: {
            userId: authUser._id,
         },
      })
      socket.connect()
      set({ socket: socket })
      console.log("set socket")
   },
   disconnectSocket: () => {
      if (get().socket?.connected) return get().socket.disconnect()
   }
}))