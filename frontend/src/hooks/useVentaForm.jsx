import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { URL_FACTURAS_VENTA_CARGAR } from "../constants/constantes";

const useVentaForm = () => {
  const [formData, setFormData] = useState({
    // id_subcliente: "",
    cuit_cliente: "",
    tipo: "",
    nro_factura: "",
    fecha_factura: "",
    tipo_factura: "venta",
    importe_neto: "",
    importe_iva: "",
    importe_total: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularTotal = () => {
    const neto = parseFloat(formData.importe_neto) || 0;
    const iva = parseFloat(formData.importe_iva) || 0;
    setFormData({ ...formData, importe_total: (neto + iva).toFixed(2)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSuccessMessage("");
    setError("");

    try {
      let response = await axios.post(URL_FACTURAS_VENTA_CARGAR,{
        cuit_cliente: formData.cuit_cliente,
        tipo: formData.tipo,
        nro_factura: formData.nro_factura,
        fecha_factura: formData.fecha_factura,
        tipo_factura: "venta",
        importe_neto: formData.importe_neto,
        importe_iva: formData.importe_iva,
        importe_total:formData.importe_total,
      })
        alert("Se cargo Factura de Venta")
        navigate("/ventas")
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