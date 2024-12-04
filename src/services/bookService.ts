import http from "./http";
import { Book, Chapter } from '../types';

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const response = await http.get("/book");
        return  response.data;
    } catch (error) {
        console.error("Error fetching book:", error);
        throw error;
    }
};
export const getBookById = async (id: string): Promise<Book> => {
    try {
      const response = await http.get(`/book/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error);
      throw error;
    }
  };
  
export const getBooksByIds = async (ids: string[]): Promise<Book[]> => {
    try {
      const response = await http.post("/book/findByIds", { ids });
      return response.data.documents;
    } catch (error) {
      console.error("Error fetching books by IDs:", error);
      throw error;
    }
  };

  export const updateBook = async ({ id, updatedData }: { id: string; updatedData: Partial<Record<string, any>> }): Promise<Book> => {
    try {
      const response = await http.patch(`/book/${id}`, updatedData);
      return response.data; 
    } catch (error) {
      console.error("Error updating the book:", error);
      throw error; 
    }
  };
  




export const getSections = async (
  bookId: string,
  chapterNumber: number,
  sectionNumber: number
) => {
  try {
    const response = await http.get(`/book/sections`, {
      params: { bookId, chapterNumber, sectionNumber },
    });
    return response.data; 
  } catch (error) {
    console.error(`Error fetching sections for book ${bookId}, chapter ${chapterNumber}, section ${sectionNumber}:`, error);
    throw error; 
  }
};
