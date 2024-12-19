import http from "./http";
import { Mail } from '../types';

export const sendMail = async (mail:Mail) => {
    try {
        const response = await http.post("/mail", mail);  
        return response.data;  
    } catch (error) {
        console.error("Error during sending mail:", error);  
        throw error;
    }
};


export const forgetPassword = async (email:string):Promise<any>=>{
    console.log("email from services",email);
    try{
        const response =await http.put ("/mail/forgot_password",{ email })
        return response.data; 
    }
    catch (error) {
        console.error("Error during sending mail:", error);  
        throw error;
    }
}