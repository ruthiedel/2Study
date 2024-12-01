import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from '../../../lib/firebase';
import { signOut } from "firebase/auth";
import { User } from '../../../types';

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null });
          console.log("User logged out successfully");
        } catch (error) {
          console.error("Error during logout:", error);
          throw error;
        }
      },
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
