import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_baseUrlApi,
  withCredentials: true,
});

export default api;
