import React, { useContext } from 'react';
import { Segment } from 'semantic-ui-react';

import TalentChart from './TalentChart';
import GeographyChart from './GeographyChart';

import RecruitsContext from '../../context/recruits/recruitsContext';
import TeamsContext from '../../context/teams/teamsContext';

const RecruitingChart = () => {
  const teamsContext = useContext(TeamsContext);
  const recruitsContext = useContext(RecruitsContext);

  const { selectedTeam } = teamsContext;
  const { analysisType } = recruitsContext;

  return (
    <Segment
      style={{
        width: '100%',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h3>
        {selectedTeam[0].text} Roster {analysisType} Breakdown
      </h3>
      {analysisType === 'Talent' ? <TalentChart /> : <GeographyChart />}
    </Segment>
  );
};

export default RecruitingChart;
