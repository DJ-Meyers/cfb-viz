import React from 'react';
import { Form } from 'semantic-ui-react';

import TeamDropdown from '../teams/TeamDropdown';
import AnalysisType from '../recruiting/AnalysisType';
import BreakdownByDropdown from './BreakdownByDropdown';

const RecruitingForm = () => {
  return (
    <Form>
      <Form.Group widths="equal">
        <TeamDropdown />
        <AnalysisType />
        <BreakdownByDropdown />
      </Form.Group>
    </Form>
  );
};

export default RecruitingForm;
