import { useState, useEffect } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { URL_CLIENTES, URL_INFORMES_IVA } from "../../constants/constantes";

const InformeIvaComp = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clienteId, setClienteId] = useState(""); // ID del cliente seleccionado
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [informe, setInforme] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener lista de clientes al cargar el componente

  const fetchClientes = async () => {
    try {
      const response = await axios.get(URL_CLIENTES);
      if (response.data && Array.isArray(response.data)) {
        setClientes(response.data); 
      }
   } catch (err) {
      console.error("Error al obtener los clientes:", err);
      setError("No se pudo cargar la lista de clientes.");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Función para generar el informe
  const generarInforme = async () => {
    setError(null);
    setIsLoading(true);
    setInforme(null); // Reset informe state

    // Validar inputs
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

    if (!clienteId) {
      setError("Debe seleccionar un cliente.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(URL_INFORMES_IVA, { startDate, endDate, clienteId });
      setInforme(response.data);
    } catch (err) {
      console.error("Error al generar el informe:", err);
      setError(err.response?.data?.message || "Error al generar el informe.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para calcular totales
  const Totals = (data) => {
    const totalNeto = data.reduce((sum, item) => sum + item.neto, 0);
    const totalIVA = data.reduce((sum, item) => sum + item.iva, 0);
    const total = data.reduce((sum, item) => sum + item.total, 0);

    return (
      <tr>
        <td colSpan="3" className="fw-bold text-end">Totales</td>
        <td>{totalNeto.toFixed(2)}</td>
        <td>{totalIVA.toFixed(2)}</td>
        <td>{total.toFixed(2)}</td>
      </tr>
    );
  };

  // Funciones de exportación
  const ExportPDF = () => {
    console.log("Exportar a PDF", informe);
  };

  const ExportExcel = () => {
    console.log("Exportar a Excel", informe);
  };

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
            <label htmlFor="cliente" className="form-label">Cliente</label>
            <select
              id="cliente"
              className="form-control"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.razon_social_cliente}
                  </option>
                ))
              ) : (
                <option value="">No hay clientes disponibles</option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Fecha de inicio</label>
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
            <label htmlFor="endDate" className="form-label">Fecha de fin</label>
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
            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Generar Informe"}
          </button>
        </form>

        {informe && (
          <div className="mt-4">
            <h2>Resultado del Informe</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>N° de factura</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Monto Neto</th>
                  <th>IVA</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {informe.map((item, index) => (
                  <tr key={index}>
                    <td>{item.numero_factura}</td>
                    <td>{item.cliente}</td>
                    <td>{item.fecha}</td>
                    <td>{item.neto.toFixed(2)}</td>
                    <td>{item.iva.toFixed(2)}</td>
                    <td>{item.total.toFixed(2)}</td>
                  </tr>
                ))}
                <Totals data={informe} />
              </tbody>
            </Table>

            <div className="mt-3 d-flex justify-content-between">
              <Button variant="success" onClick={ExportExcel}>Exportar a Excel</Button>
              <Button variant="danger" onClick={ExportPDF}>Exportar a PDF</Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default InformeIvaComp;



// import { useState , useEffect} from "react";
// import { Container, Table, Button, Spinner } from "react-bootstrap";
// import axios from "axios";
// import { URL_CLIENTES, URL_INFORMES_IVA } from "../../constants/constantes";

// const InformeIvaComp = () => {
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [clienteId, setClienteId] = useState(""); // ID del cliente seleccionado
//     const [clientes, setClientes] = useState([]); // Lista de clientes
//     const [informe, setInforme] = useState(null);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
  
//     // Obtener lista de clientes al cargar el componente
// const fetchClientes = async () => {
  //         try {
  //           const response = await axios.get(URL_CLIENTES);
  //           setClientes(response.data);
  //         } catch (err) {
  //           console.error("Error al obtener los clientes. ", err);
  //           setError("No se pudo cargar la lista de clientes.");
  //         }
  //       };
//     useEffect(() => {
//       fetchClientes();
//     }, []);

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError(null);
//       setIsSubmit(true);
  
//     // Función para generar el informe
//     const generarInforme = async () => {
//       setError(null);
//       setIsLoading(true);
  
//       // Validar inputs
//       if (!startDate || !endDate) {
//         setError("Las fechas de inicio y fin son obligatorias.");
//         setIsLoading(false);
//         return;
//       }
  
//       if (new Date(startDate) > new Date(endDate)) {
//         setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
//         setIsLoading(false);
//         return;
//       }
  
//       if (!clienteId) {
//         setError("Debe seleccionar un cliente.");
//         setIsLoading(false);
//         return;
//       }
  
//       try {
//         const response = await axios.post(URL_INFORMES_IVA, { startDate, endDate, clienteId });
//         setInforme(response.data);
//       } catch (err) {
//         console.error("Error al generar el informe:", err);
//         setError(err.response?.data?.message || "Error al generar el informe.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//   // Función para calcular totales
//   const Totals = (data) => {
//     const totalNeto = data.reduce((sum, item) => sum + item.neto, 0);
//     const totalIVA = data.reduce((sum, item) => sum + item.iva, 0);
//     const total = data.reduce((sum, item) => sum + item.total, 0);

//     return (
//       <tr>
//         <td colSpan="3" className="fw-bold text-end">Totales</td>
//         <td>{totalNeto.toFixed(2)}</td>
//         <td>{totalIVA.toFixed(2)}</td>
//         <td>{total.toFixed(2)}</td>
//       </tr>
//     );
//   };

//   // Funciones de exportación
//   const ExportPDF = () => {
//     console.log("Exportar a PDF", informe);
//   };

//   const ExportExcel = () => {
//     console.log("Exportar a Excel", informe);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await generarInforme();
//   };

//   return (
//     <Container fluid className="py-4">
//       <div className="bg-light p-4 rounded shadow-sm">
//         <h1 className="mb-4">Informe de IVA</h1>
//         {error && <p className="alert alert-danger">{error}</p>}
//         <form onSubmit={handleSubmit} className="p-4 border rounded">
//           <div className="mb-3">
//             <label htmlFor="cliente" className="form-label">Cliente</label>
//             <input
//               id="cliente"
//               type="text"
//               className="form-control"
//               placeholder="Nombre del cliente"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="startDate" className="form-label">Fecha de inicio</label>
//             <input
//               id="startDate"
//               type="date"
//               className="form-control"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="endDate" className="form-label">Fecha de fin</label>
//             <input
//               id="endDate"
//               type="date"
//               className="form-control"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary" disabled={isLoading}>
//             {isLoading ? <Spinner as="span" animation="border" size="sm" /> : "Generar Informe"}
//           </button>
//         </form>

//         {informe && (
//           <div className="mt-4">
//             <h2>Resultado del Informe</h2>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>N° de factura</th>
//                   <th>Cliente/Proveedor</th>
//                   <th>Fecha</th>
//                   <th>Monto Neto</th>
//                   <th>IVA</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {informe.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.numero_factura}</td>
//                     <td>{item.proveedor || item.cliente}</td>
//                     <td>{item.fecha}</td>
//                     <td>{item.neto.toFixed(2)}</td>
//                     <td>{item.iva.toFixed(2)}</td>
//                     <td>{item.total.toFixed(2)}</td>
//                   </tr>
//                 ))}
//                 <Totals data={informe} />
//               </tbody>
//             </Table>

//             <div className="mt-3 d-flex justify-content-between">
//               <Button variant="success" onClick={ExportExcel}>Exportar a Excel</Button>
//               <Button variant="danger" onClick={ExportPDF}>Exportar a PDF</Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };
// }

// export default InformeIvaComp;
