import http from "./http";
import { LearningGroup } from '../types';
import { Message } from "postcss";

export const fetchMessages = async (bookId: string): Promise<LearningGroup> => {
  try {
    const response = await http.get(`/chat/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching messages for book ${bookId}:`, error);
    throw error;
  }
};

export const addMessage = async (data: {
    book_id: string;
    userName: string;
    message: string;
    userId: string;
  }): Promise<Message> => {
    try {
      const response = await http.post(`/chat`, {
        userName: data.userName,
        message: data.message,
        bookId: data.book_id,
        userId: data.userId
      });
      return response.data;
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    }
  };