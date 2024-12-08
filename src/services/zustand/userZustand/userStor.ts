import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from '../../../lib/firebase';
import { signOut } from "firebase/auth";
import { User } from '../../../types';
import { updateUser } from '../../../services/userService';

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateUserZustand: (userId: string, updatedUser: User) => void;
  logout: () => Promise<void>;
};


const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      updateUserZustand: async (userId: string, updatedUser: User) => {
        try {
          await updateUser({id: userId, updatedData: updatedUser}); 
          set({ user: updatedUser }); 
        } catch (error) {
          console.error("Failed to update user");
        }
      },
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