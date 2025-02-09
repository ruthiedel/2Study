import http from "./http";
import { LoginCredentials, User, UserWithPassword } from '../types';

export const registerUser = async (user: UserWithPassword) => {
  try {
      const response = await http.post("/register", user); 
      return response.data;  
  } catch (error) {
      console.error("Error during registration:", error);  
      throw error;
  }
};

export const logInUser = async (credentials: LoginCredentials) => {
  try {
      const response = await http.post("/user", credentials);  
      return response.data;  
  } catch (error) {
      console.error("Error during login:", error);  
      throw error;
  }
};

export const logInWithGoogle = async(user:UserWithPassword) => {
  try {
    const response = await http.post("/google", user);  
    return response.data;  
} catch (error) {
    console.error("Error during login:", error);  
    throw error;
}
}

export const updateUser = async ({ id, updatedData }: { id: string; updatedData: User }): Promise<User> => {
  try {
    const response = await http.put(`/user/${id}`, updatedData);
    return response.data; 
  } catch (error) {
    console.error("Error updating the user:", error);
    throw error; 
  }
};

export const updatePassword = async ({ email, newPassword }: { email: string; newPassword: string }) => {
  try {
    const response = await http.put("/auth", { email, newPassword });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};