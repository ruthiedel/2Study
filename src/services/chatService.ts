import http from "./http";
import { Message } from '../types';

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


export const parseUserName = (userName: string): { id: string; name: string } => {
  const lastSpaceIndex = userName.lastIndexOf(' ');

  return {
    id: lastSpaceIndex !== -1 ? userName.substring(lastSpaceIndex + 1) : '',
    name: lastSpaceIndex !== -1 ? userName.substring(0, lastSpaceIndex) : userName,
  };
};

export function extractIdAndNameFromMessages(messages: Message[]): {
  id: string;
  name: string;
}[]{
  return messages.map(message => {
    const lastSpaceIndex = message.username.lastIndexOf(' ');
    return {
      id: lastSpaceIndex !== -1 ? message.username.substring(lastSpaceIndex + 1) : message.username,
      name: lastSpaceIndex !== -1 ? message.username.substring(0, lastSpaceIndex) : '',
    };
  });
}