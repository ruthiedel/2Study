import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { User } from "@/types";

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateRating: (bookId: string, newRating: number) => void;
  logout: () => Promise<void>;
};


const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      updateRating: (bookId: string, newRating: number) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedBooks = currentUser.books.map((book) => {
            if (book.book_id === bookId) {
              return { ...book, rate: newRating };
            }
            return book;
          });
          set({ user: { ...currentUser, books: updatedBooks } });
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
