import {
  GET_TEAMS,
  GET_TEAM_OPTIONS,
  SELECT_TEAM,
  TEAMS_ERROR
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        loading: false
      };
    case GET_TEAM_OPTIONS:
      return {
        ...state,
        teamOptions: action.payload,
        loading: false
      };
    case SELECT_TEAM:
      return {
        ...state,
        selectedTeam: action.payload
      };
    case TEAMS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
