//api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://fifpbackendser-production.up.railway.app/",
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
