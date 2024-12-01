import http from "./http";
import { Mail } from '../types';

export const sendMail = async (mail:Mail) => {
    try {
        const response = await http.post("/mail", mail);  
        return response.data;  
    } catch (error) {
        console.error("Error during login:", error);  
        throw error;
    }
};
