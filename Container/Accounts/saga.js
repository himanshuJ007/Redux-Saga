import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchUser, toggleLoader } from '../App/actions';
import HomeService from '../../services/HomeService';
import message from 'antd/es/message';
import { FETCH_DEGREES, UPDATE_STUDENT_PROFILE } from './constants';
import { fetchDegreesError, fetchDegreesSuccess, updateStudentProfileError } from './actions';
import UserService from '../../services/UserService';
import { notification } from 'antd';
import AuthService from '../../services/AuthService';

export function* fetchDegreesSaga({ data }) {
  yield put(toggleLoader(true));
  try {
    const response = yield call(HomeService.fetchDegrees, data);
    if (response.statusCode) {
      message.error(response.message);
      yield put(toggleLoader(false));
      return;
    }
    yield put(fetchDegreesSuccess(response));
    yield put(toggleLoader(false));
  } catch (err) {
    console.log(err);
    yield put(fetchDegreesError(err));
  }
}

export function* updateStudentProfileSaga({ data }) {
  yield put(toggleLoader(true));
  try {
    const response = yield call(UserService.updateStudentProfile, data);
    if (response.statusCode) {
      message.error(response.message);
      yield put(toggleLoader(false));
      return;
    }
    if (response && response.fileUploadPath) {
      yield call(AuthService.uploadToS3, response.fileUploadPath, data.profileImage.file, data.profileImage.file.type)
    }
    // upload code
    notification.success({
      message: 'Profile Updated',
      top: 60,
      duration: 3,
      rtl: true,
    })
    yield put(fetchUser());
    yield put(toggleLoader(false));
  } catch (err) {
    console.log(err);
    yield put(updateStudentProfileError(err));
  }
}

// Individual exports for testing
export default function* accountSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_DEGREES, fetchDegreesSaga);
  yield takeLatest(UPDATE_STUDENT_PROFILE, updateStudentProfileSaga);
}
