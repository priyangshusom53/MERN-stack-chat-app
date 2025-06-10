import { create } from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'
import { useAuthStore } from './useAuthStore'



export const useChatStore = create((set, get) => ({
   messages: [],
   users: [],
   selectedUser: null,
   isUsersLoading: false,
   isMessagesLoading: false,
   setSelectedUser: (user) => {
      set({ selectedUser: user })
   },

   getUsers: async () => {

      set({ isUsersLoading: true })
      try {
         const res = await axiosInstance.get("/message/contacts")
         console.log(res.data.contacts)
         set({ users: res.data.contacts })
         console.log(get().users)

      } catch (err) {
         console.log(err)
         toast.error(err.response.data.message)
      } finally {
         set({ isUsersLoading: false })
      }

   },
   addUser: async (email) => {
      set({ isUsersLoading: true })
      try {
         const res = await axiosInstance.post("/message/addContact", { email: email })
         set({ authUser: res.data })
         await get().getUsers()
         toast.success('Contact added successfully')
      } catch (err) {
         toast.error(err.response.data.message)
      } finally {
         set({ isUsersLoading: false })
      }
   },
   getMessages: async (userId) => {
      set({ isMessagesLoading: true })
      try {
         const res = await axiosInstance.get(`/message/${userId}`)
         set({ messages: res.data.messages })
      } catch (err) {
         toast.error(err.response.data.message)
      } finally {
         set({ isMessagesLoading: false })
      }
   },
   sendMessage: async (messageData) => {
      const { selectedUser, messages } = get()
      try {
         const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
         set({ messages: [...messages, res.data] })

      } catch (err) {
         toast.error(err.response.data.message)
      }
   },
   subscribeToMessages: () => {
      const { selectedUser } = get()
      if (!selectedUser) return
      console.log("subscribe to message called")
      const socket = useAuthStore.getState().socket


      socket?.on('newMessage', (newMessage) => {
         if (newMessage.senderId !== selectedUser._id) return
         console.log("message received")
         set({ messages: [...get().messages, newMessage] })
      })
   },
   unsubscribeToMessages: () => {
      const { socket } = useAuthStore.getState().socket
      if (socket) socket.off('newMessage')
   }
}))