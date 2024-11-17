import { useState, useEffect } from "react";
import { Table, Button, Container, Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import api from "../api"; // Archivo para manejar las peticiones al backend
import "../styles/facturaTabla.css";

const TablaFactura = () => {
    const [facturas, setFacturas] = useState([]);
    const [filteredFacturas, setFilteredFacturas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("todas");

    useEffect(() => {
        const fetchFacturas = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.getInvoices(); // Petición para obtener las facturas
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

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFiltro(value);

        if (value === "todas") {
            setFilteredFacturas(facturas);
        } else {
            setFilteredFacturas(facturas.filter((factura) => factura.tipo === value));
        }
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Gestión de Facturas</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Select value={filtro} onChange={handleFilterChange}>
                                <option value="todas">Todas</option>
                                <option value="compra">Facturas de Compras</option>
                                <option value="venta">Facturas de Ventas</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Número</th>
                                <th>Tipo</th>
                                <th>Cliente/Proveedor</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFacturas.length > 0 ? (
                                filteredFacturas.map((factura, index) => (
                                    <tr key={factura.id}>
                                        <td>{index + 1}</td>
                                        <td>{factura.fecha}</td>
                                        <td>{factura.numero}</td>
                                        <td>{factura.tipo === "compra" ? "Compra" : "Venta"}</td>
                                        <td>{factura.clienteOProveedor}</td>
                                        <td>${factura.total.toLocaleString()}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => console.log("Editar factura", factura.id)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => console.log("Eliminar factura", factura.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No hay facturas registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
};
export default TablaFactura;
