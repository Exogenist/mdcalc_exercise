import {
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';

function PatientFormRow ({ value, name, placeholder, suffixText, isDecimal, onChange }) {
  const handleKeyDown = (e) => {
    if (e.key === '.') {
      e.preventDefault();
    }
  }

  return (
    <Form.Row>
      <Form.Label column="md" md={4}>
        {placeholder}
      </Form.Label>
      <Col>
        <InputGroup>
          <Form.Control
            type="number"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(evt) => onChange(evt.target.value, name)}
            step={isDecimal ? ".01" : "1"}
            min="0"
            onKeyDown={!isDecimal ? handleKeyDown : null}
          />
          <InputGroup.Prepend>
            <InputGroup.Text>{suffixText}</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Col>
    </Form.Row>
  );
}

export default PatientFormRow;
