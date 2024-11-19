import { useState } from "react";
import FacturaService from "../api/facturas";

const useInforme = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [informe, setInforme] = useState(null);
  const [error, setError] = useState(null);

  const generarInforme = async () => {
    try {
      const params = { startDate, endDate };
      const res = await FacturaService.generateIvaReport(params);
      setInforme(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error al generar el informe.");
      setInforme(null);
    }
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    informe,
    error,
    generarInforme,
  };
};

export default useInforme;
