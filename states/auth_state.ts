import { create } from "zustand"

import { AuthUser } from "@/types/user"

interface AuthState {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser(user) {
    set({ user: user })
  },
}))
