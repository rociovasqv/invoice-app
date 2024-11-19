import axios from "axios"

export const jsonInstance = axios.create({
  baseURL: 'http://localhost:8000' ,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});