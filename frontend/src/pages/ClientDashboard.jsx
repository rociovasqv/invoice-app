import { Container, Row, Col, Card, Alert, Spinner} from "react-bootstrap";
import { Link, useParams } from "react-router-dom"; 
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/dashboard.css";

import { URL_CLIENTES } from "../constants/constantes";


const ClientDashboard = () => {

    const { id } = useParams(); 
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    //Obtener datos del cliente
     const fetchCliente = useCallback(async () => {
        try{
            const res = await axios.get(`${URL_CLIENTES}/${id}`);
            const clienteData = res.data[0];
            if(clienteData){
                setCliente(clienteData)}
                else{
                    setError("No se encontraron datos del cliente.");
                }
            }
            catch(error){
                console.error("Error al obtener los datos del cliente", error);
                setError("No se pudieron cargar los datos del cliente.");
            }
            }, [id]);

            useEffect(()=>{
                if(id){
                    fetchCliente();
                }},[id, fetchCliente]);
                useEffect(()=> {
                    if (cliente !== null || error){
                        setLoading(false);
                    }
                }, [cliente, error]);

  const modules = [
    { title: "Gestión de Ventas", icon: "💰", description: "Registra y gestiona las ventas", path: "/ventas" },
    { title: "Gestión de Compras", icon: "📄", description: "Administra las compras realizadas", path: "/compras" },
    { title: "Informes de venta", icon: "👤", description: "Generar informes para subclientes", path: "/subclientes" },
    {title: "Informes de compra", icon: "📦", description: "Generar informes para proveedores", path: "/proveedores"},
  ];
  return (
    <Container fluid className="pad dashboard-container">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="dashboard-title">Panel del cliente: {cliente?.razon_social_cliente || "Cargando..."}</h1>
           {error && <Alert variant="danger">{error}</Alert>}
           <Link to={"/clientes"} style={{textDecoration: 'none'}}>← Volver a la lista de clientes</Link>
        </Col>
      </Row>
      {loading ? (<div className="text-center"><Spinner animation="border"/><Spinner/></div>) :
       (<>
         <Row>
        {modules.map((module, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Link to={module.path} style={{ textDecoration: 'none' }}>
            <Card className="dashboard-card" style={{ cursor: 'pointer' }}>
              <Card.Body>
                <div className="icon-container">{module.icon}</div>
                <Card.Title>{module.title}</Card.Title>
                <Card.Text>{module.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        ))}
      </Row>
       </>)
      }
    
    </Container>
  );
};

export default ClientDashboard;