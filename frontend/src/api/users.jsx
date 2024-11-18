import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Reemplaza con la URL de tu backend
});

export const getUsers = () => api.get("/usuarios");
export const getUserById = (id) => api.get(`/usuarios/${id}`);
export const createUser = (data) => api.post("/usuarios", data);
export const updateUser = (id, data) => api.put(`/usuarios/${id}`, data);
export const deleteUser = (id) => api.delete(`/usuarios/${id}`);

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};