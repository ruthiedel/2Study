import http from "./http";

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
