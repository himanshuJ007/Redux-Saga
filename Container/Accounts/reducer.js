/*
 *
 * Account reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, FETCH_DEGREES_SUCCESS } from './constants';

export const initialState = {
  degrees: [],
};

/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_DEGREES_SUCCESS:
        return {
          ...state,
          degrees: action.data.data,
        };
      case DEFAULT_ACTION:
        break;
    }
  });

export default accountReducer;
