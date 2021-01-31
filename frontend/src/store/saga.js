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
  GET_ALL_DONATIONS,
  GET_DONATIONS_FOR_MONTH,
  UPDATE_DONATION_STATUS,
  SUBMIT_NEW_DONATION_FORM,
  SUBMIT_EDIT_DONATION_FORM,
  GET_DONATION_INFO,
} from './actions/donations'
import {
  fetchDonations,
  fetchDonationsForMonth,
  startDonationStatusUpdate,
  submitNewDonationForm,
  submitEditDonationForm,
  fetchDonationInfo,
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
  GET_STUDENT_INFO,
  GET_ALL_STUDENTS,
  SUBMIT_NEW_STUDENT_FORM,
  SUBMIT_EDIT_STUDENT_FORM,
} from './actions/students'
import {
  fetchStudentInfo,
  fetchAllStudents,
  submitNewStudentForm,
  submitEditStudentForm,
} from './sagas/students'
import {
  GET_ALL_TRANSFER,
  SUBMIT_TRANSFER_FORM,
  SUBMIT_EDIT_TRANSFER_FORM,
  GET_TRANSFER_INFO,
} from './actions/transfers'
import {
  fetchAllTransfers,
  submitTransferForm,
  submitEditTransferForm,
  fetchTransferInfo,
} from './sagas/transfers'
import {
  logInUser,
  getAuthenticationState,
  logOutUser,
} from './sagas/authentication'
import { fetchAttendances } from './sagas/attendances'
import { GET_ALL_ATTENDANCES } from './actions/attendances'
import { GET_ALL_ADDRESSES, GET_SEARCH_ADDRESSES } from './actions/addresses'
import { fetchAddressesSaga, searchAddressesSaga } from './sagas/addresses'
//import { GET_ALL_TRANSFER } from './actions'
import { GET_CONFIG_DATA_DIVISIONS } from './actions/configData'
import { fetchMyanamrDivisionDataSaga } from './sagas/configData'

// add Saga below
export default function* rootSaga() {
  yield all([
    takeLatest(GET_ALL_USERS, fetchAllUsers),
    takeLatest(SUBMIT_USER_FORM, submitUserForm),
    takeLatest(SUBMIT_EDIT_USER_FORM, submitEditUserForm),
    takeLatest(GET_ALL_DONATIONS, fetchDonations),
    takeLatest(GET_DONATIONS_FOR_MONTH, fetchDonationsForMonth),
    takeLatest(GET_DONATION_INFO, fetchDonationInfo),
    takeLatest(UPDATE_DONATION_STATUS, startDonationStatusUpdate),
    takeLatest(SUBMIT_NEW_DONATION_FORM, submitNewDonationForm),
    takeLatest(SUBMIT_EDIT_DONATION_FORM, submitEditDonationForm),
    takeLatest(GET_ALL_SCHOOLS, fetchAllSchools),
    takeLatest(SUBMIT_NEW_SCHOOL_FORM, submitNewSchoolForm),
    takeLatest(SUBMIT_EDIT_SCHOOL_FORM, submitEditSchoolForm),
    takeLatest(GET_ALL_ADDRESSES, fetchAddressesSaga),
    takeLatest(GET_SEARCH_ADDRESSES, searchAddressesSaga),
    takeLatest(GET_STUDENT_INFO, fetchStudentInfo),
    takeLatest(GET_ALL_STUDENTS, fetchAllStudents),
    takeLatest(GET_CONFIG_DATA_DIVISIONS, fetchMyanamrDivisionDataSaga),
    takeLatest(SUBMIT_NEW_STUDENT_FORM, submitNewStudentForm),
    takeLatest(SUBMIT_EDIT_STUDENT_FORM, submitEditStudentForm),
    takeLatest(GET_ALL_ATTENDANCES, fetchAttendances),
    takeLatest(LOG_IN, logInUser),
    takeLatest(LOG_OUT, logOutUser),
    takeLatest(CHECK_LOG_IN_STATE, getAuthenticationState),
    takeLatest(GET_ALL_TRANSFER, fetchAllTransfers),
    takeLatest(GET_TRANSFER_INFO, fetchTransferInfo),
    takeLatest(SUBMIT_TRANSFER_FORM, submitTransferForm),
    takeLatest(SUBMIT_EDIT_TRANSFER_FORM, submitEditTransferForm),
  ])
}
