import http from "./http";
import { User } from '../types';

export const logInUser = async (user: Omit<User, '_id'>) => {
    try {
        const response = await http.post("/user", user);  
        return response.data;  
    } catch (error) {
        console.error("Error during login:", error);  
        throw error;
    }
};

// export const addBookToUser = async (userId: string, bookId: string, bookName: string) => {
//     try {
//         const response = await http.patch(`/user/${userId}`, { bookId, bookName });
//         return response.data;
//     } catch (error) {
//         console.error("Error adding book to user:", error);
//         throw error;
//     }
// };

export const updateUser = async ({ id, updatedData }: { id: string; updatedData: User }): Promise<User> => {
    try {
      const response = await http.put(`/user/${id}`, updatedData);
      return response.data; 
    } catch (error) {
      console.error("Error updating the user:", error);
      throw error; 
    }
  };
