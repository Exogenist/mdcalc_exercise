import axios from 'axios';

const apiUrl = 'https://open-ic.epic.com/FHIR/api/FHIR/DSTU2';

const getGenderAndAge = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Patient/Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB`, {
      "Content-Type": "application/xml; charset=utf-8"
    });
    const data = response.data;
    return [data.gender, convertBirthToAge(data.birthDate)];
  } catch (err) {
    console.log(err);
  }
}

const getLatestWeight = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=29463-7`, {
      "Content-Type": "application/xml; charset=utf-8"
    });
    return parseWeightAndHeight(response);
  } catch (err) {
    console.log(err);
  }
}

const getLatestHeight = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=8302-2`, {
      "Content-Type": "application/xml; charset=utf-8"
    });
    return parseWeightAndHeight(response);
  } catch (err) {
    console.log(err);
  }
}

const parseWeightAndHeight = (response) => {
  const data = response.data;
  let latestEffectiveDate = new Date('1900-01-01');
  let value = 0;

  data?.entry.forEach((entry) => {
    const resource = entry.resource;
    const effectiveDate = new Date(resource.effectiveDateTime);

    if (effectiveDate > latestEffectiveDate) {
      value = resource.valueQuantity.value;
      latestEffectiveDate = effectiveDate;
    }
  });
  return value;
}

const convertBirthToAge = (birthDate) => {
  let ageDifMs = Date.now() - new Date(birthDate).getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const apis = { getGenderAndAge, getLatestWeight, getLatestHeight };

export default apis;
