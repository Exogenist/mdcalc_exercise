import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';

import './App.css';
import mdCalcService from './services/mdcalc-service';
import { PatientFormRow, PatientTabs } from './components';
import { Genders, PatientFormFields } from './enums';

function App() {
  const [resource, setResource] = useState({
    height: 0,
    weight: 0,
    age: 0,
    gender: null,
    creatinine: '',
  });
  const [score, setScore] = useState(0);
  const [onceCalculated, setOnceCalculated] = useState(false);

  const getResource = useCallback(async () => {
    const height = await mdCalcService.getLatestHeight();
    const weight = await mdCalcService.getLatestWeight();
    const [gender, age] = await mdCalcService.getGenderAndAge();

    setResource({
      ...resource,
      height,
      weight,
      gender,
      age,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getResource();
  }, [getResource]);

  const handleResource = (value, key) => {
    setResource({
      ...resource,
      [key]: value,
    });
  }

  const handleCalculate = () => {
    let _score = 0;
    Object.keys(PatientFormFields).forEach((k) => {
      if (resource[PatientFormFields[k].name] > PatientFormFields[k].boundaryValue) {
        _score++;
      }
    });
    if (resource.gender === 'male') {
      _score += 1;
    }
    setScore(_score);
    setOnceCalculated(true);
  }

  const getResultSection = () => {
    return `results: score ${score}, ${score > 3 ? 'High' : 'Low'}`;
  }

  return (
    <Container className="p-3">
      <PatientTabs />
      <Form.Group className="mt-5">
        {/* Gender */}
        <Form.Row>
          <Form.Label column="md" md={4}>
            Sex
          </Form.Label>
          <Col>
            <ToggleButtonGroup
              variant="secondary"
              type="radio"
              name="options"
              value={resource.gender}
              onChange={(val) => handleResource(val, 'gender')}
            >
              {Object.keys(Genders).map((k) => (
                <ToggleButton
                  key={k}
                  variant="outline-success"
                  value={Genders[k].value}
                >
                  {Genders[k].text}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Col>
        </Form.Row>
        <br />
        {Object.keys(PatientFormFields).map((k) => (
          <div key={k}>
            <PatientFormRow
              value={resource[PatientFormFields[k].name]}
              name={PatientFormFields[k].name}
              placeholder={PatientFormFields[k].placeholder}
              suffixText={PatientFormFields[k].suffixText}
              isDecimal={PatientFormFields[k].isDecimal}
              onChange={handleResource}
            />
            <br />
          </div>
        ))}
        {/* Calculation section */}
        <Form.Row>
          <Form.Label column="md" md={4}>
            {onceCalculated ? getResultSection() : null}
          </Form.Label>
          <Col>
            <Button type="button" variant="success" onClick={handleCalculate}>Calculate</Button>
          </Col>
        </Form.Row>
      </Form.Group>
    </Container>
  );
}

export default App;
