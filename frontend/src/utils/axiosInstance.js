import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ your backend runs on 8080
  withCredentials: true, // ✅ sends HTTP-only cookie automatically
});

export default axiosInstance;
