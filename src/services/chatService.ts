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

export const convertToLocalMessage = (message: Message): localMessage => {
  let username = 'racheli';
  let userId = '770';

  if (message.userName) {
    const lastSpaceIndex = message.userName.lastIndexOf(' ');
    username = lastSpaceIndex !== -1 ? message.userName.substring(0, lastSpaceIndex) : '';
    userId = lastSpaceIndex !== -1 ? message.userName.substring(lastSpaceIndex + 1) : '';
  }

  return {
    messageId: message._id || '',
    username,
    userId,
    message: message.message,
    timestamp: message.timestamp,
  };
}

