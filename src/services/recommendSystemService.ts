import { Book } from "../types";
import http from "./http";

type BookWithoutCoverImage = Omit<Book, 'coverImage'>; 


export const recommendSystem = async (userId:string, books:BookWithoutCoverImage) => {
    try {
        const response = await http.post("/recommendSystem", {
            userId,
            books: books
        });

        return response.data;  
    } catch (error) {
        console.error("Error during recommend system:", error);  
        throw error;
    }
};
