import React, { useReducer } from 'react';
import axios from 'axios';
import TeamsContext from './teamsContext';
import TeamsReducer from './teamsReducer';
import { TEAMS_ERROR, SELECT_TEAM, GET_TEAM_OPTIONS } from '../Types';

const TeamsState = props => {
  const initialState = {
    teams: [],
    teamOptions: [],
    selectedTeam: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(TeamsReducer, initialState);

  const getTeamOptions = async () => {
    try {
      const res = await axios.get('/api/teams');
      const teamsArray = res.data.sports[0].leagues[0].teams;

      const teamOptions = [];
      teamsArray.forEach(teamItem => {
        teamOptions.push({
          text: teamItem.team.displayName,
          key: teamItem.team.id,
          value: teamItem.team.id,
          nickname: teamItem.team.nickname
        });
      });

      dispatch({
        type: GET_TEAM_OPTIONS,
        payload: teamOptions
      });
    } catch (err) {
      dispatch({ type: TEAMS_ERROR, payload: err.message });
    }
  };

  // Select Team
  const selectTeam = team => {
    console.log(team);
    dispatch({ type: SELECT_TEAM, payload: team });
  };

  return (
    <TeamsContext.Provider
      value={{
        teams: state.teams,
        teamOptions: state.teamOptions,
        selectedTeam: state.selectedTeam,
        loading: state.loading,
        getTeamOptions,
        selectTeam
      }}
    >
      {props.children}
    </TeamsContext.Provider>
  );
};

export default TeamsState;
