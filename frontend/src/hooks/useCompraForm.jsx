import { useState } from "react";
import { URL_FACTURAS_CARGAR } from "../constants/constantes";
import axios from "axios";

const useCompraForm = () => {
  const [formData, setFormData] = useState({
    id_proveedor: "",
    tipo: "compra",
    nro_factura: "",
    fecha_factura: "",
    nombre_proveedor: "",
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
    setFormData({ ...formData, importe_total: (neto + iva).toFixed(2)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSuccessMessage("");
    setError("");

    try {
      await axios.post(URL_FACTURAS_CARGAR, formData);
      setSuccessMessage("Factura registrada con éxito");
      setFormData({
        // id_subcliente: "",
        id_proveedor: "",
        tipo: "compra",
        nombre_proveedor: "",
        nro_factura: "",
        fecha_factura: "",
        cuit: "",
        tipo_factura: "",
        importe_neto: "",
        importe_iva: "",
        importe_total: "",
      });
    } catch (error) {
      console.error("Error en la respuesta del servidor:", error.response?.data || error.message);
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
    handleSubmit,
    calcularTotal
  };
};

export default useCompraForm;



// import { useState } from "react";
// import FacturaService from "../api/facturas";

// const useFacturaForm = () => {
//   const [formData, setFormData] = useState({
//     id_cliente: "",
//     id_subcliente: "",
//     id_proveedor: "",
//     tipo: "compra",
//     nro_factura: "",
//     fecha_factura: "",
//     importe_neto: "",
//     importe_iva: "",
//     importe_total: "",
//     tipo_factura: "",
//     items: []
//   });

//   const [isSubmit, setIsSubmit] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [error, setError] = useState("");
//   const [item, setItem] = useState({ particular: "", cantidad: "", tasa: "", importe: 0 });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmit(true);
//   setSuccessMessage("Factura registrada:", formData);
//   setError("");

//     try {
//       const response = await FacturaService.createInvoice(formData);
//       setSuccessMessage(response.data.message);
//       setFormData({
//         id_cliente: "",
//         id_subcliente: "",
//         id_proveedor: "",
//         tipo: "compra",
//         nro_factura: "",
//         fecha_factura: "",
//         importe_neto: "",
//         importe_iva: "",
//         importe_total: "",
//         tipo_factura: "",
//       });
//     } catch (error) {
//       setError(error.response?.data?.error || "Error al registrar la factura.");
//     } finally {
//       setIsSubmit(false);
//     }
//   };
//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     const updatedItem = { ...item, [name]: value };

//     if (name === "cantidad" || name === "tasa") {
//       updatedItem.importe = (updatedItem.cantidad * updatedItem.tasa || 0).toFixed(2);
//     }

//     setItem(updatedItem);
//   };

//   const agregarItem = () => {
//     if (item.particular && item.cantidad && item.tasa) {
//       setFormData({
//         ...formData,
//         items: [...formData.items, { ...item }],
//       });
//       setItem({ particular: "", cantidad: "", tasa: "", importe: 0 });
//     }
//   };
//   const eliminarItem = (index) => {
//     const updatedItems = formData.items.filter((_, i) => i !== index);
//     setFormData({ ...formData, items: updatedItems });
//   };

  
//   const calcularTotal = () => {
//     formData.items.reduce((total, currentItem) => total + parseFloat(currentItem.amount), 0).toFixed(2);
//     const neto = parseFloat(formData.importe_neto) || 0;
//     const iva = parseFloat(formData.importe_iva) || 0;
//     setFormData({ ...formData, importe_total: (neto + iva).toFixed(2) });
//   };


//   return {
//     formData,
//     isSubmit,
//     successMessage,
//     error,
//     item,
//     handleSubmit,
//     handleInputChange,
//     handleItemChange,
//     agregarItem,
//     eliminarItem,
//     calcularTotal,
   
//   };
// };

// export default useFacturaForm;