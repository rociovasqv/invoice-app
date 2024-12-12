import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import useCompraForm from '../../hooks/useCompraForm';

const AgregarCompraForm = () => {
  const {formData,
    isSubmit,
    successMessage,
    error,
    handleChange,
    calcularTotal,
    handleSubmit,} = useCompraForm()

  return (
    <Container className="pad my-5 mt-1">
      <h2 className="text-center mb-4">Registrar factura de compra</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Número de Factura</Form.Label>
              <Form.Control
                type="text"
                name="nro_factura"
                onChange={handleChange}
                placeholder="Número de factura"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group>
              <Form.Label>Fecha de Factura</Form.Label>
              <Form.Control
                type="date"
                name="fecha_factura"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group>
              <Form.Label>Tipo de Factura</Form.Label>
              <Form.Select name="tipo" onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="Nota de Débito A">Nota de Débito A</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col md={4}>
            <Form.Group>
            {/* cambiar por cuit  */}
              <Form.Label>CUIT del proveedor</Form.Label>
              <Form.Control
                type="text"
                name="cuit_proveedor"
                onChange={handleChange}
                placeholder="cuit del proveedor"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Importe Neto</Form.Label>
              <Form.Control
                type="number"
                name="importe_neto"
                onChange={handleChange}
                onBlur={calcularTotal}
                step="0.01"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Importe IVA</Form.Label>
              <Form.Control
                type="number"
                name="importe_iva"
                value={formData.importe_iva}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Importe Total</Form.Label>
              <Form.Control
                type="number"
                name="importe_total"
                value={formData.importe_total}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
      
        </Row>

        <Button type="submit" variant="primary" disabled={isSubmit}>
        {isSubmit ? <Spinner animation="border" size="sm" /> : "Registrar"}
        </Button>
      </Form>
    </Container>
  );
};

export default AgregarCompraForm;

// Estilo de formulario con los items incluidos

// import { Container, Card, Row, Col, Form, Button, Table, InputGroup, Alert, Spinner } from "react-bootstrap";
// import useFacturaForm from "../../hooks/useFacturaForm";


// const FacturaForm = () => {
//     const {
//         formData,
//         isSubmit,
//         successMessage,
//         error,
//         item,
//         handleSubmit,
//         handleInputChange,
//         handleItemChange,
//         agregarItem,
//         eliminarItem,
//         calcularTotal
//       } = useFacturaForm();

//   return (
//     <Container className="my-4">
//       <Card>
//         <Card.Header className="text-center">
//           <h4>Registrar Factura</h4>
//           {successMessage && <Alert variant="success">{successMessage}</Alert>}
//           {error && <Alert variant="danger">{error}</Alert>}
//         </Card.Header>
//         <Card.Body>
//           {/* Información del cliente */}
//           <Row>
//             <Col md={8}>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text>Cliente</InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   name="id_cliente"
//                   placeholder="Nombre del cliente"
//                   value={formData.id_cliente}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </InputGroup>
//                 <InputGroup className="mb-3">
//                 <Form.Label>Subcliente</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="id_subcliente"
//                     value={formData.id_subcliente}
//                     onChange={handleInputChange}
//                     placeholder={"ID del subcliente"}
//                     />
//                 </InputGroup>

//               <InputGroup className="mb-3">
//                 <InputGroup.Text>Dirección</InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   name="direccion"
//                   placeholder="Dirección"
//                   value={formData.direccion}
//                   onChange={handleInputChange}
//                 />
//               </InputGroup>

//               <InputGroup className="mb-3">
//                 <InputGroup.Text>Ciudad</InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   name="ciudad"
//                   placeholder="Ciudad"
//                   value={formData.ciudad}
//                   onChange={handleInputChange}
//                 />
//               </InputGroup>
//             </Col>
//             <Col md={4}>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text>Factura N°</InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   name="nro_factura"
//                   placeholder="Número de factura"
//                   value={formData.nro_factura}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </InputGroup>

//               <InputGroup className="mb-3">
//                 <InputGroup.Text>Fecha</InputGroup.Text>
//                 <Form.Control
//                   type="date"
//                   name="fecha_factura"
//                   value={formData.fecha_factura}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </InputGroup>
//             </Col>
//           </Row>

//           {/* Tabla de ítems */}
//           <Table bordered>
//             <thead className="table-success">
//               <tr>
//                 <th>#</th>
//                 <th>Particular</th>
//                 <th className="text-end">Cantidad</th>
//                 <th className="text-end">Precio</th>
//                 <th className="text-end">Importe</th>
//                 <th className="text-center">Acción</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData.items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{item.particular}</td>
//                   <td className="text-end">{item.cantidad}</td>
//                   <td className="text-end">{item.tasa}</td>
//                   <td className="text-end">{item.importe}</td>
//                   <td className="text-center">
//                     <Button size="sm" variant="danger" onClick={() => eliminarItem(index)}>
//                       X
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               <tr>
//                 <td>#</td>
//                 <td>
//                   <Form.Control
//                     type="text"
//                     name="particular"
//                     placeholder="Descripción"
//                     value={item.particular}
//                     onChange={handleItemChange}
//                   />
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="number"
//                     name="cantidad"
//                     placeholder="Cantidad"
//                     value={item.cantidad}
//                     onChange={handleItemChange}
//                     className="text-end"
//                   />
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="number"
//                     name="tasa"
//                     placeholder="Precio"
//                     value={item.tasa}
//                     onChange={handleItemChange}
//                     className="text-end"
//                   />
//                 </td>
//                 <td>
//                   <Form.Control type="text" value={item.importe} readOnly className="text-end" />
//                 </td>
//                 <td className="text-center">
//                   <Button size="sm" variant="success" onClick={agregarItem}>
//                     +
//                   </Button>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>

//           {/* Total */}
//           <Row>
//             <Col md={8}>
//               <Button variant="primary" onClick={handleSubmit}>
//                 Registrar Factura
//               </Button>
//             </Col>
//             <Col md={4}>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text>Total</InputGroup.Text>
//                 <Form.Control type="text" value={calcularTotal()} readOnly className="text-end" />
//               </InputGroup>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//       <Button type="submit" variant="primary" disabled={isSubmit}>
//            {isSubmit ? <Spinner animation="border" size="sm" /> : "Registrar Factura"}
//        </Button>
//     </Container>
//   );
// };

// export default FacturaForm;
