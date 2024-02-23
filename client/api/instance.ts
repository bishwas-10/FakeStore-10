import axios from "axios";

const BASE_URL="https://eccomerce-admin1.onrender.com/api"

export const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers:{
      'Content-Type':'application/json',

  },
  });

  export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});