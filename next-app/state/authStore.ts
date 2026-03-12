
import { create } from "zustand";

interface AuthStore {
  user: any | null;
  checkUser: () => Promise<void>;
  isLoading: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  checkUser: async () => {

   set({ isLoading: true })
    try {
      const res = await fetch("http://localhost:8000/auth/me", {
        credentials: "include"
      })

      if (!res.ok) {
        set({ user: null, isLoading: false })
        return
      }

      const data = await res.json()

      set({
        user: data.user,
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
  isLoading: true,
}));