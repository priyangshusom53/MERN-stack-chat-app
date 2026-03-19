import {create} from 'zustand'
import type { User } from '../models/user';

interface AuthStore {
  user: User | null;
  checkUser: () => Promise<void>;
  isLoading: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  checkUser: async () => {

   set({ isLoading: true })
    try {
      const res = await fetch("http://localhost:5001/auth/me", {
        credentials: "include"
      })

      if (!res.ok) {
        set({ user: null, isLoading: false })
        return
      }

      const data = await res.json()

      set({
        user:{
            id:data.user.id,
            name:data.user.name,
            email:data.user.email,
            chats:data.user.chats
        },
        isLoading: false
      })

    } catch (err) {
      set({
        user: null,
        isLoading: false
      })
      console.error("Error checking user:", err)
    }
  },
}));