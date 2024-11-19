import { jsonInstance } from "./http";

const baseUrl = "/clientes";
const http = jsonInstance;

class ClienteService {
  // Crear o agregar un cliente
  async createClient(data) {
    return await http.post(`${baseUrl}`, data);
  }

  // Obtener todos los clientes
  async getAllClients() {
    return await http.get(`${baseUrl}`);
  }

  // Obtener un cliente por ID
  async getClientById(id) {
    return await http.get(`${baseUrl}/${id}`);
  }

  // Actualizar un cliente
  async updateClient(id, data) {
    return await http.put(`${baseUrl}/${id}`, data);
  }

  // Eliminar un cliente
  async deleteClient(id) {
    return await http.delete(`${baseUrl}/${id}`);
  }
}

export default new ClienteService();
