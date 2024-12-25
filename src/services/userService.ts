import http from "./http";
import { LoginCredentials, User, UserWithPassword } from '../types';
import { openDB, IDBPDatabase } from 'idb';

let db: IDBPDatabase | null = null;
  async function openDatabase() {
    if (db) return db;
    db = await openDB('image_storage', 1, {
        upgrade(db) {
            db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        },
    });
    return db;
}

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
