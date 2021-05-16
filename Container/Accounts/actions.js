/*
 *
 * Account actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_DEGREES,
  FETCH_DEGREES_ERROR,
  FETCH_DEGREES_SUCCESS,
  UPDATE_STUDENT_PROFILE, UPDATE_STUDENT_PROFILE_ERROR, UPDATE_STUDENT_PROFILE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchDegrees(data) {
  return {
    type: FETCH_DEGREES,
    data,
  };
}

export function fetchDegreesSuccess(data) {
  return {
    type: FETCH_DEGREES_SUCCESS,
    data,
  };
}

export function fetchDegreesError(error) {
  return {
    type: FETCH_DEGREES_ERROR,
    error,
  };
}

export function updateStudentProfile(data) {
  return {
    type: UPDATE_STUDENT_PROFILE,
    data,
  };
}

export function updateStudentProfileError(error) {
  return {
    type: UPDATE_STUDENT_PROFILE_ERROR,
    error,
  };
}
