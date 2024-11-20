import { useState } from "react";
import FacturaService from "../api/facturas";

const useVentaForm = () => {
  const [formData, setFormData] = useState({
    // id_subcliente: "",
    id_cliente: "",
    tipo: "venta",
    nro_factura: "",
    fecha_factura: "",
    nombre_cliente: "",
    cuit: "",
    tipo_factura: "",
    importe_neto: "",
    importe_iva: "",
    importe_total: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularTotal = () => {
    const neto = parseFloat(formData.importe_neto) || 0;
    const iva = parseFloat(formData.importe_iva) || 0;
    setFormData({ ...formData, importe_total: (neto + iva).toFixed(2) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSuccessMessage("");
    setError("");

    try {
      await FacturaService.createInvoice(formData);
      setSuccessMessage("Factura registrada con éxito");
      setFormData({
        // id_subcliente: "",
        id_cliente: "",
        tipo: "venta",
        nombre_cliente: "",
        nro_factura: "",
        fecha_factura: "",
        cuit: "",
        tipo_factura: "",
        importe_neto: "",
        importe_iva: "",
        importe_total: "",
      });
    } catch (error) {
      setError(error.response?.data?.error || "Error al registrar la factura.");
    } finally {
      setIsSubmit(false);
    }
  };
  return {
    formData,
    isSubmit,
    successMessage,
    error,
    handleChange,
    calcularTotal,
    handleSubmit,
  };
};

export default useVentaForm;