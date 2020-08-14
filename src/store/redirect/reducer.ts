import { INIT_STATE_TYPE } from './types';
import { REDIRECT_TO, actionTypes } from '../actionTypes';

const INIT_STATE: INIT_STATE_TYPE = {
  to: null,
};

const redirectReducer = (state = INIT_STATE, action: REDIRECT_TO): INIT_STATE_TYPE => {
  switch (action.type) {
    case actionTypes.REDIRECT_TO:
      state = {
        to: action.payload,
      };
      break;
  }
  return state;
};

export default redirectReducer;
