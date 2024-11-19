import { jsonInstance } from "./http";

const baseUrl = "/usuarios";
const http = jsonInstance;

class UsuarioService {
  async createUser(data) {
    return await http.post(`${baseUrl}`, data);
  }

  async getUserById(id) {
    return await http.get(`${baseUrl}/${id}`);
  }

  async getAllUsers() {
    return await http.get(`${baseUrl}`);
  }

  async updateUser(id, data) {
    return await http.put(`${baseUrl}/${id}`, data);
  }

  async deleteUser(id) {
    return await http.delete(`${baseUrl}/${id}`);
  }
}

export default new UsuarioService();