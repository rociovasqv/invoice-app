import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL_FACTURAS_VENTA_EDITAR, URL_FACTURAS_VENTA_FILTRAR } from "../constants/constantes";

const useEditarVentaForm = () => {
  const [formData, setFormData] = useState({});
  const estadoInicial = {
    cuit_cliente: "",
    tipo: "",
    nro_factura: "",
    fecha_factura: "",
    tipo_factura: "Venta",
    importe_neto: "",
    importe_iva: "",
    importe_total: "",
  }
  const {id} = useParams()

  const [isSubmit, setIsSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const fetchFactura = async () => {
      try {
        const response = await axios.get(URL_FACTURAS_VENTA_FILTRAR+"/"+id);
        console.log(response.data)
        setFormData(response.data[0]);
      } catch (error) {
        console.error("Error al obtener los datos de la factura:", error.response?.data || error.message);
        setError("No se pudieron cargar los datos de la factura.");
      }
    };

useEffect(()=>{
    fetchFactura()
},[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((estadoInicial) => {
      const updatedData = { ...estadoInicial, [name]: value };

      // Recalcula el IVA y total si cambia el tipo o importe_neto
      if (name === "tipo" || name === "importe_neto") {
        const neto = parseFloat(updatedData.importe_neto) || 0;

        let iva = 0;
        if (updatedData.tipo !== "C") {
          iva = parseFloat(neto * 0.21) || 0;
        }

        updatedData.importe_iva = iva.toFixed(2);
        updatedData.importe_total = (neto + iva).toFixed(2);
      }

      return updatedData;
    });
  };

  const calcularTotal = () => {
    const neto = parseFloat(formData.importe_neto) || 0;

    let iva = 0;
    if (formData.tipo !== "C") {
      iva = parseFloat(neto * 0.21) || 0;
    }

    setFormData({
      ...formData,
      importe_iva: iva.toFixed(2),
      importe_total: (neto + iva).toFixed(2),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSuccessMessage("");
    setError("");

    try {
      await axios.put(URL_FACTURAS_VENTA_EDITAR+"/"+id, {
        nro_factura: formData.nro_factura,
        cuit_cliente: formData.cuit_cliente,
        tipo: formData.tipo,
        fecha_factura: formData.fecha_factura,
        tipo_factura: "Venta",
        importe_neto: formData.importe_neto,
        importe_iva: formData.importe_iva,
        importe_total: formData.importe_total,
      });
      alert("Factura de Venta actualizada correctamente");
      navigate("/ventas");
    } catch (error) {
      console.error("Error en la respuesta del servidor:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Error al actualizar la factura.");
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
    handleSubmit,
    calcularTotal,
  };
};

export default useEditarVentaForm;