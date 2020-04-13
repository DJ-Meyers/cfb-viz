import React from 'react';
import { Form } from 'semantic-ui-react';

const OffenseDefenseRadio = () => {
  const onChange = (e, data) => {
    console.log(data.value);
  };

  return (
    <Form.Group inline>
      <label>Include</label>
      <Form.Radio label="All" value="all" onChange={onChange} />
      <Form.Radio label="Off only" value="off" onChange={onChange} />
      <Form.Radio label="Def only" value="def" onChange={onChange} />
    </Form.Group>
  );
};

export default OffenseDefenseRadio;
