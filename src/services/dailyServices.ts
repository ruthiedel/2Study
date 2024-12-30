import http from "./http";


export const dailyContent = async () => {

    try {
        const response = await http.get("/daily");
        return response.data;
      } catch (error) {
        console.error("Error posting message:", error);
        throw error;
      }
}