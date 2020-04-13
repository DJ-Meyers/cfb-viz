import {
  GET_TEAM_ROSTER_BREAKDOWN,
  CLEAR_ROSTER_BREAKDOWN,
  RECRUITS_ERROR,
  SET_BREAKDOWN_BY,
  SET_FILTER,
  CLEAR_FILTER,
  SET_ANALYSIS_TYPE
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case GET_TEAM_ROSTER_BREAKDOWN:
      return {
        ...state,
        rosterBreakdown: action.payload,
        loadingRosterBreakdown: false
      };
    case CLEAR_ROSTER_BREAKDOWN:
      return {
        ...state,
        rosterBreakdown: [],
        loadingRosterBreakdown: true
      };
    case SET_ANALYSIS_TYPE:
      return {
        ...state,
        analysisType: action.payload
      };
    case SET_BREAKDOWN_BY:
      return {
        ...state,
        breakdownBy: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filterBy: action.payload,
        filteredRoster: state.rosterBreakdown.filter(player => {
          return state.breakdownBy === 'Year'
            ? player.position === action.payload
            : player.year === action.payload;
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filterBy: null,
        filteredRoster: []
      };
    case RECRUITS_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingRecruits: false,
        loadingRoster: false
      };
    default:
      return state;
  }
};
