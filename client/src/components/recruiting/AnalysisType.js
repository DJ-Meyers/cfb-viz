import React, { useContext } from 'react';
import RecruitsContext from '../../context/recruits/recruitsContext';
import { Form } from 'semantic-ui-react';

const AnalysisType = () => {
  const recruitsContext = useContext(RecruitsContext);
  const { setAnalysisType } = recruitsContext;

  const onChange = (e, data) => {
    setAnalysisType(data.value);
  };

  const options = [
    {
      key: 'Talent',
      text: 'Talent',
      value: 'Talent'
    },
    {
      key: 'Geography',
      text: 'Geography',
      value: 'Geography'
    }
  ];

  return (
    <Form.Dropdown
      label="Chart Type"
      defaultValue="Talent"
      options={options}
      fluid
      selection
      onChange={onChange}
    />
  );
};

export default AnalysisType;
