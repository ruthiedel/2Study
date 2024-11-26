
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}),
    {
    name: 'user',
  }));



export default useUserStore;
