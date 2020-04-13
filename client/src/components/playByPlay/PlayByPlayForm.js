import React, { Fragment } from 'react';
import { Form, FormGroup } from 'semantic-ui-react';

import TeamDropdown from '../teams/TeamDropdown';
import OffenseDefenseRadio from './OffenseDefenseRadio';

const PlayByPlayForm = () => {
  return (
    <Form>
      <FormGroup widths="equal">
        <TeamDropdown required={true} />
        <OffenseDefenseRadio />
      </FormGroup>
      <h4>PBP Form</h4>
    </Form>
  );
};

export default PlayByPlayForm;
