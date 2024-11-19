import { Container } from "react-bootstrap";
import useInforme from "../../hooks/useInforme";

const InformeIvaComp = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    informe,
    error,
    isLoading,
    generarInforme,
  } = useInforme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generarInforme();
  };

  return (
    <Container fluid className="py-4">
      <div className="bg-light p-4 rounded shadow-sm">
        <h1 className="mb-4">Informe de IVA</h1>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleSubmit} className="p-4 border rounded">
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Fecha de inicio
            </label>
            <input
              id="startDate"
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              Fecha de fin
            </label>
            <input
              id="endDate"
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Generando..." : "Generar Informe"}
          </button>
        </form>
        {informe && (
          <div className="mt-4">
            <h2>Resultado del Informe</h2>
            <pre className="bg-dark text-light p-3 rounded">
              {JSON.stringify(informe, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Container>
  );
};

export default InformeIvaComp;

