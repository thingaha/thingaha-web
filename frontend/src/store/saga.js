import {
  takeLatest,
  all,
  // call
} from 'redux-saga/effects'
import {
  GET_ALL_USERS,
  SUBMIT_USER_FORM,
  SUBMIT_EDIT_USER_FORM,
} from './actions/users'
import { LOG_IN, LOG_OUT, CHECK_LOG_IN_STATE } from './actions/authentication'
import {
  fetchAllUsers,
  submitUserForm,
  submitEditUserForm,
} from './sagas/users'

import {
  GET_DONATIONS_FOR_MONTH,
  UPDATE_DONATION_STATUS,
} from './actions/donations'
import {
  fetchDonationsForMonth,
  startDonationStatusUpdate,
} from './sagas/donations'
import {
  GET_ALL_SCHOOLS,
  SUBMIT_NEW_SCHOOL_FORM,
  SUBMIT_EDIT_SCHOOL_FORM,
} from './actions/schools'
import {
  fetchAllSchools,
  submitNewSchoolForm,
  submitEditSchoolForm,
} from './sagas/schools'
import {
  logInUser,
  getAuthenticationState,
  logOutUser,
} from './sagas/authentication'
import { GET_ALL_ADDRESSES, GET_SEARCH_ADDRESSES } from './actions/addresses'
import { fetchAddressesSaga, searchAddressesSaga } from './sagas/addresses'

// add Saga below
export default function* rootSaga() {
  yield all([
    takeLatest(GET_ALL_USERS, fetchAllUsers),
    takeLatest(SUBMIT_USER_FORM, submitUserForm),
    takeLatest(SUBMIT_EDIT_USER_FORM, submitEditUserForm),
    takeLatest(GET_DONATIONS_FOR_MONTH, fetchDonationsForMonth),
    takeLatest(UPDATE_DONATION_STATUS, startDonationStatusUpdate),
    takeLatest(GET_ALL_SCHOOLS, fetchAllSchools),
    takeLatest(SUBMIT_NEW_SCHOOL_FORM, submitNewSchoolForm),
    takeLatest(SUBMIT_EDIT_SCHOOL_FORM, submitEditSchoolForm),
    takeLatest(GET_ALL_ADDRESSES, fetchAddressesSaga),
    takeLatest(GET_SEARCH_ADDRESSES, searchAddressesSaga),
    takeLatest(LOG_IN, logInUser),
    takeLatest(LOG_OUT, logOutUser),
    takeLatest(CHECK_LOG_IN_STATE, getAuthenticationState),
  ])
}
