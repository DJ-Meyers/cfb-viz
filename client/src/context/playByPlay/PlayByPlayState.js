import React, { useReducer } from 'react';
import axios from 'axios';
import playByPlayContext from './playByPlayContext';
import PlayByPlayReducer from './playByPlayReducer';
import {} from '../Types';

const RecruitsState = props => {
  const initialState = {
    offenseOnly: false,
    defenseOnly: false,
    filterText: ''
  };

  const [state, dispatch] = useReducer(PlayByPlayReducer, initialState);

  // Functions

  return (
    <playByPlayContext.Provider
      value={{
        offenseOnly: state.offenseOnly,
        defenseOnly: state.defenseOnly,
        filterText: state.filterText
      }}
    >
      {props.children}
    </playByPlayContext.Provider>
  );
};

export default RecruitsState;
