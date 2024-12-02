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

  export const updateBook = async ({ id, updatedData }: { id: string; updatedData: Book }): Promise<Book> => {
    try {
      const response = await http.put(`/book/${id}`, updatedData);
      return response.data; 
    } catch (error) {
      console.error("Error updating the book:", error);
      throw error; 
    }
  };
  

export const getNextChapter = (book: Book, currentChapterId: string): Chapter | null => {
    try {
      const currentChapterIndex = book.chapters.findIndex(
        (chapter) => chapter._id === currentChapterId
      );

  
//       if (currentChapterIndex === -1 || currentChapterIndex === book.chapters.length - 1) {
//         return null; 
//       }
  
//       return book.chapters[currentChapterIndex + 1];
//     } catch (error) {
//       console.error("Error finding the next chapter:", error);
//       throw error;
//     }
//   };


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
// export const saveBookRating = async (bookId: string, averageRating: number) => {
//   // קריאה לפונקציה לעדכון הדירוג של הספר
//   await updateBookRating(bookId, averageRating);
// }
