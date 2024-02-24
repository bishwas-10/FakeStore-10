import axios from "axios";



export const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
