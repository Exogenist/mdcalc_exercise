import {
  Tab,
  Tabs,
} from 'react-bootstrap';
import { PatientTabContents } from '../enums';

function PatientTabs () {
  return (
    <Tabs defaultActiveKey="whenToUse" transition={false}>
      {Object.keys(PatientTabContents).map((key) => (
        <Tab
          key={key}
          eventKey={key}
          title={PatientTabContents[key].title}
          className="mt-3"
        >
          <strong>{PatientTabContents[key].boldText}</strong>
          <ul>
            {PatientTabContents[key].texts.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </Tab>
      ))}
    </Tabs>
  );
}

export default PatientTabs;
