import { useState } from "react";

const useInforme = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [informe, setInforme] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const generarInforme = async () => {
    setError(null); // Limpiar errores anteriores
    setIsLoading(true); // Activar estado de carga

    // Validar fechas antes de la solicitud
    if (!startDate || !endDate) {
      setError("Las fechas de inicio y fin son obligatorias.");
      setIsLoading(false);
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
      setIsLoading(false);
      return;
    }

    try {
      const params = { startDate, endDate };
      const res = await FacturaService.generateIvaReport(params);
      setInforme(res.data); // Guardar el informe generado
    } catch (err) {
      console.error("Error al generar el informe:", err); // Log para depuración
      setError(err.response?.data?.message || "Error al generar el informe.");
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    informe,
    error,
    isLoading,
    generarInforme,
  };
};

export default useInforme;
