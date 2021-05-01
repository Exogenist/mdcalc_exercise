const PatientFormFields = {
  AGE: {
    name: 'age',
    placeholder: 'Age',
    suffixText: 'years',
    isDecimal: false,
    boundaryValue: 40,
  },
  WEIGHT: {
    name: 'weight',
    placeholder: 'Weight',
    suffixText: 'kg',
    isDecimal: true,
    boundaryValue: 60,
  },
  CREATININE: {
    name: 'creatinine',
    placeholder: 'Creatinine',
    suffixText: 'mg/dL',
    isDecimal: true,
    boundaryValue: 0.7,
  },
  HEIGHT: {
    name: 'height',
    placeholder: 'Height',
    suffixText: 'cm',
    isDecimal: true,
    boundaryValue: 160,
  },
};

export default PatientFormFields;
