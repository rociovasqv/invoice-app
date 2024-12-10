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
    <Row className="mb-3">
      <Col md={5}>
        <FormControl
          type="date"
          placeholder="Fecha de inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Col>
      <Col md={5}>
        <FormControl
          type="date"
          placeholder="Fecha de fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Col>
      <Col md={2}>
        <Button variant="primary" onClick={handleFilter}>
          Filtrar
        </Button>
      </Col>
    </Row>
  );
};

export default DateFilter;
