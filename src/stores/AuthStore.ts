import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import api from '~/lib/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Collections } from '~/types/types'
import { IUserProps } from '~/types/interface'

interface AuthState {
  user: IUserProps | null
  setUser: (user: IUserProps | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUserProps | null) => set({ user }),
      login: async (email: string, password: string) => {
        await api
          .collection(Collections.Users)
          .authWithPassword(email, password)
          .then((response) => {
            set({ user: response.record as any })
          })
          .catch((error) => {
            console.log(error)
          })
      },
      logout: async () => {
        api.authStore.clear()
        set({ user: null })
        return Promise.resolve()
      },
    }),
    {
      name: '@auth', // Nome para identificar o armazenamento persistente
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
