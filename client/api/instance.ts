import axios from "axios";



export const instance = axios.create({
  baseURL: "https://eccomerce-admin1.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: "https://eccomerce-admin1.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
