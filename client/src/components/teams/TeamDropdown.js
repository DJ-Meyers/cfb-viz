import React, { useContext, useEffect } from 'react';
import TeamsContext from '../../context/teams/teamsContext';
// import Select from 'react-dropdown-select';
import { Form } from 'semantic-ui-react';
// import './teamDropdown.css';

const TeamDropdown = ({ required }) => {
  const teamsContext = useContext(TeamsContext);

  const { teamOptions, getTeamOptions, selectTeam } = teamsContext;

  useEffect(() => {
    getTeamOptions();

    //eslint-disable-next-line
  }, []);

  const onChange = (e, data) => {
    const team = teamOptions.filter(
      teamOption => teamOption.key === data.value
    );
    selectTeam(team);
  };

  return (
    <Form.Dropdown
      label="Team"
      placeholder="Select a team"
      options={teamOptions}
      fluid
      search
      selection
      clearable
      required={required}
      onChange={onChange}
    />
  );
};

export default TeamDropdown;
