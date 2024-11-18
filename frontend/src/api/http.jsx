import axios from 'axios';

export const jsonInstance = axios.create({
  baseURL: ,
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});