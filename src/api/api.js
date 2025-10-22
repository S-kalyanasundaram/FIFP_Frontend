//api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://api.fifpclub.com/fifpchatbot/"//"http://127.0.0.1:8000"/"https://38cc92e0-f706-4259-992f-2f26420dbae0-00-26jzlejsgu0zm.sisko.replit.dev/"//"https://api.fifpclub.com/fifpchatbot/"//"http://127.0.0.1:8000",//"https://fifpbackendser-production.up.railway.app/"
});

export const loadData = (userId) => API.post(`/load-data/${userId}`);
export const askQuestion = (payload) => API.post(`/ask`, payload);
export const getSessions = (userId) => API.get(`/chat-sessions/${userId}`);
export const getChatHistory = (userId, sessionId) =>
  API.get(`/chat-history/${userId}/${sessionId}`);
export const deleteSession = (userId, sessionId) =>
  API.delete(`/chat-sessions/${userId}/${sessionId}`);

export const renameSession = (userId, sessionId, title) =>
  API.put(`/chat-sessions/${userId}/${sessionId}`, { title });

export const getUserName = (userId) => API.get(`/user-name/${userId}`);


