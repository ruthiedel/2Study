import http from "./http";
import { Book } from "@/types";

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const response = await http.get("/book");
        return  response.data.documents;
    } catch (error) {
        console.error("Error fetching book:", error);
        throw error;
    }
};