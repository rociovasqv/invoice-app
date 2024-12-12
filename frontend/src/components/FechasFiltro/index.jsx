import { FormControl, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    if (onFilter) {
      onFilter({ startDate, endDate });
    }
  };

  return (
    <Row className="mb-0 align-items-center">
      <Col md="auto" className="d-flex align-items-center">
    <p className="mb-0 me-3" style={{fontWeight:'bold'}}>Filtro de fechas</p>
  </Col>
      <Col md="auto" className='d-flex align-items-center'>
      <label className='me-2 mb-0'>Desde</label>
        <FormControl
          type="date"
          placeholder="Fecha de inicio"
          value={startDate}
          id='startDate'
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Col>
      <Col md="auto" className='d-flex align-items-center'>
      <label className='me-2'>Hasta</label>
        <FormControl
          type="date"
          placeholder="Fecha de fin"
          value={endDate}
          id='endDate'
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Col>
      <Col md='auto'>
        <Button variant="primary" onClick={handleFilter} className="ms-3">
          Filtrar
        </Button>
      </Col>
    </Row>
  );
};

export default DateFilter;
