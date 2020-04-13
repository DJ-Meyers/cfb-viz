import React, { useContext, Fragment, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import TeamsContext from '../../context/teams/teamsContext';
import RecruitsContext from '../../context/recruits/recruitsContext';
import RecruitingTable from './RecruitingTable';
import RecruitingChart from './RecruitingChart';

const RecruitingDataViz = () => {
  const teamsContext = useContext(TeamsContext);
  const recruitsContext = useContext(RecruitsContext);

  const { selectedTeam } = teamsContext;
  const {
    getTeamRosterBreakdown,
    clearRosterBreakdown,
    loadingRosterBreakdown,
    rosterBreakdown
  } = recruitsContext;

  useEffect(() => {
    if (!selectedTeam) return;
    if (rosterBreakdown !== null) clearRosterBreakdown();

    if (selectedTeam.length) {
      getTeamRosterBreakdown(selectedTeam[0].nickname);
    }

    //eslint-disable-next-line
  }, [selectedTeam]);

  return selectedTeam !== null && selectedTeam.length > 0 ? (
    <div>
      {loadingRosterBreakdown ? (
        <Loader active inline="centered" size="massive">
          Loading the {selectedTeam[0].text} Roster... This can take a minute
        </Loader>
      ) : rosterBreakdown !== null && rosterBreakdown.length > 0 ? (
        <Fragment>
          <RecruitingChart />
          <RecruitingTable />
        </Fragment>
      ) : (
        <Fragment>No roster available</Fragment>
      )}
    </div>
  ) : (
    <div>
      <h3>Select a team to view its recruiting breakdown</h3>
    </div>
  );
};

export default RecruitingDataViz;
