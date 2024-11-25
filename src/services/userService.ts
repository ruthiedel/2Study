import http from "./http";
import { User } from "@/types";

export const logInUser = async (user: Omit<User, '_id'>) => {
    try {
        const response = await http.post("/user", user);  
        return response.data;  
    } catch (error) {
        console.error("Error during login:", error);  
        throw error;
    }
};
