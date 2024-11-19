import useInforme from "../../hooks/useInforme";
import { Container } from "react-bootstrap";

const InformeIvaComp = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    informe,
    error,
    generarInforme,
  } = useInforme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generarInforme();
  };

  return (
    <Container fluid>
       <div>
          <h1>Informe de IVA</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <button type="submit">Generar Informe</button>
          </form>
          {informe && <pre>{JSON.stringify(informe, null, 2)}</pre>}
      </div>
    </Container>
   
  );
};

export default InformeIvaComp

