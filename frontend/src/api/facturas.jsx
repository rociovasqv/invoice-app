import { jsonInstance } from "./http";

const baseUrl = "/facturas";
const comprobantesUrl = "/comprobantes";
const informesUrl = "/informes/iva";
const http = jsonInstance;

class FacturaService {
  // Registrar una factura (compra o venta)
  async createInvoice(data) {
    return await http.post(`${baseUrl}`, data);
  }

  // Obtener todas las facturas
  async getAllInvoices() {
    return await http.get(`${baseUrl}`);
  }

  // Obtener una factura por ID
  async getInvoiceById(id) {
    return await http.get(`${baseUrl}/${id}`);
  }

  // Cargar un comprobante
  async uploadComprobante(data) {
    // Se asume que `data` incluye el archivo y otros datos necesarios
    const formData = new FormData();
    formData.append("comprobante", data.file); // Archivo del comprobante
    formData.append("detalles", JSON.stringify(data.detalles)); // Otros detalles como JSON
    return await http.post(`${comprobantesUrl}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Generar un informe de IVA
  async generateIvaReport(params) {
    // `params` podría incluir filtros como rango de fechas o tipos de facturas
    const query = new URLSearchParams(params).toString();
    return await http.get(`${informesUrl}?${query}`);
  }
}

export default new FacturaService();