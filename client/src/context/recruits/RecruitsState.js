import React, { useReducer } from 'react';
import axios from 'axios';
import RecruitsContext from './recruitsContext';
import RecruitsReducer from './recruitsReducer';
import {
  GET_TEAM_ROSTER_BREAKDOWN,
  RECRUITS_ERROR,
  CLEAR_ROSTER_BREAKDOWN,
  SET_BREAKDOWN_BY,
  SET_FILTER,
  CLEAR_FILTER,
  SET_ANALYSIS_TYPE
} from '../Types';

const RecruitsState = props => {
  const initialState = {
    rosterBreakdown: [],
    filteredRoster: [],
    error: null,
    analysisType: 'Talent',
    loadingRosterBreakdown: true,
    breakdownBy: 'Position',
    filterBy: null
  };

  const [state, dispatch] = useReducer(RecruitsReducer, initialState);

  // Get all the players on the roster
  const getTeamRosterBreakdown = async teamName => {
    try {
      clearFilter();

      const res = await axios.get(
        `/api/recruiting/rosterBreakdown/${teamName.replace(' ', '-')}`
      );
      const playerArray = res.data;

      dispatch({
        type: GET_TEAM_ROSTER_BREAKDOWN,
        payload: playerArray
      });
    } catch (err) {
      dispatch({ type: RECRUITS_ERROR, payload: err.message });
    }
  };

  // Clear roster
  const clearRosterBreakdown = () => {
    dispatch({ type: CLEAR_ROSTER_BREAKDOWN });
  };

  // Change the type of Chart
  const setAnalysisType = type => {
    try {
      console.log(type);
      dispatch({
        type: SET_ANALYSIS_TYPE,
        payload: type
      });
    } catch (err) {
      dispatch({ type: RECRUITS_ERROR, payload: err.message });
    }
  };

  // Change between breaking down recruiting by position and by year
  const setBreakdownBy = mode => {
    try {
      // if (
      //   (['OL', 'QB', 'RB', 'WR', 'TE', 'DL', 'LB', 'DB', 'ST'].includes(
      //     state.filterBy
      //   ) &&
      //     mode === 'Position') ||
      //   (['FR', 'SO', 'JR', 'SR'].includes(state.filterBy) && mode === 'Year')
      // )
      dispatch({ type: CLEAR_FILTER });

      dispatch({
        type: SET_BREAKDOWN_BY,
        payload: mode
      });
    } catch (err) {
      dispatch({ type: RECRUITS_ERROR, payload: err.message });
    }
  };

  // Filter rosterBreakdown
  const setFilter = filterCriterion => {
    try {
      dispatch({
        type: SET_FILTER,
        payload: filterCriterion
      });
    } catch (err) {
      dispatch({ type: RECRUITS_ERROR, payload: err.message });
    }
  };

  // Clear Filters
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecruitsContext.Provider
      value={{
        rosterBreakdown: state.rosterBreakdown,
        analysisType: state.analysisType,
        loadingRosterBreakdown: state.loadingRosterBreakdown,
        breakdownBy: state.breakdownBy,
        filteredRoster: state.filteredRoster,
        filterBy: state.filterBy,
        getTeamRosterBreakdown,
        clearRosterBreakdown,
        setAnalysisType,
        setBreakdownBy,
        setFilter,
        clearFilter
      }}
    >
      {props.children}
    </RecruitsContext.Provider>
  );
};

export default RecruitsState;
