import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/test",
});

API.interceptors.request.use((config) => {
  console.log(
    "➡️ Request:",
    config.method?.toUpperCase(),
    config.url,
    config.data
  );
  return config;
});

export default API;
