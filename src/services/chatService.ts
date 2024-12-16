import http from "./http";
import { Message, localMessage } from '../types';

export const postMessage = async (message: string, username: string, bookId: string) => {
  try {
    const response = await http.post("/chat", {
      message,
      username,
      bookId,
    });
    return response.data;  
  } catch (error) {
    console.error("Error posting message:", error);  
    throw error;
  }
};


export const convertMessagesToLocalMessages = (messages: Message[]): localMessage[] => {
  return messages.map((msg) => {
    const lastSpaceIndex = msg.username.lastIndexOf(' ');
    const username = lastSpaceIndex !== -1 ? msg.username.substring(0, lastSpaceIndex) : '';
    const userId = lastSpaceIndex !== -1 ? msg.username.substring(lastSpaceIndex + 1) : '';

    return {
      messageId: msg._id || '', 
      username,
      userId,
      bookId: msg.bookId,
      message: msg.message,
      timestamp: msg.timestamp,
    };
  });
};

export const convertLocalMessagesToMessages = (localMessages: localMessage[]): Message[] => {
  return localMessages.map((localMessage) => ({
    _id: localMessage.messageId,
    bookId: localMessage.bookId, 
    username: `${localMessage.username} ${localMessage.userId}`,
    message: localMessage.message,
    timestamp: localMessage.timestamp,
  }));
};