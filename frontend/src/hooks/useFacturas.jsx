import { useState, useEffect } from "react";
import FacturaService from "../api/facturas";

const useFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [filteredFacturas, setFilteredFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  // Cargar facturas al inicio
  useEffect(() => {
    const fetchFacturas = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await FacturaService.getAllInvoices();
        setFacturas(res.data);
        setFilteredFacturas(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar las facturas.");
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, []);

  // Filtrar facturas según tipo
  const handleFilterChange = (value) => {
    setFiltro(value);
    if (value === "todas") {
      setFilteredFacturas(facturas);
    } else {
      setFilteredFacturas(facturas.filter((factura) => factura.tipo === value));
    }
  }; 
//Eliminar factura
const eliminarFactura = async (id) => {
  setLoading(true);
  setError(null);
  try {
    await FacturaService.deleteInvoice(id);
    return { success: true };
  } catch (err) {
    setError(err.response?.data?.message || "Error al eliminar la factura.");
    throw err;
  } finally {
    setLoading(false);
  }
};

  return {
    facturas,
    filteredFacturas,
    loading,
    error,
    filtro,
    handleFilterChange,
    eliminarFactura
  };
};

export default useFacturas;
