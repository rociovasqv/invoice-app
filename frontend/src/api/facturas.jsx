// import axios from 'axios';
const api = ''

export const getInvoices = () => api.get("/facturas");
export const getInvoiceById = (id) => api.get(`/facturas/${id}`);
export const createInvoice = (data) => api.post("/facturas", data);
export const updateInvoice = (id, data) => api.put(`/facturas/${id}`, data);
export const deleteInvoice = (id) => api.delete(`/facturas/${id}`);

export default {
    getInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};