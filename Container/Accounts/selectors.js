import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the account state domain
 */

const selectAccountDomain = state => state.account || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Account
 */

const makeSelectAccount = () =>
  createSelector(
    selectAccountDomain,
    substate => substate,
  );

const makeSelectDegrees = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.degrees,
  );

export default makeSelectAccount;
export { selectAccountDomain, makeSelectDegrees };
