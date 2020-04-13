import React, { useContext } from 'react';
import RecruitsContext from '../../context/recruits/recruitsContext';
import { Form } from 'semantic-ui-react';

const BreakdownByDropdown = () => {
  const recruitsContext = useContext(RecruitsContext);
  const { setBreakdownBy } = recruitsContext;

  const onChange = (e, data) => {
    setBreakdownBy(data.value);
  };

  const options = [
    { key: 'Position', text: 'Position', value: 'Position' },
    { key: 'Year', text: 'Year', value: 'Year' }
  ];

  return (
    <Form.Dropdown
      label="Breakdown By"
      defaultValue="Position"
      options={options}
      fluid
      selection
      onChange={onChange}
    />
  );
};

export default BreakdownByDropdown;
