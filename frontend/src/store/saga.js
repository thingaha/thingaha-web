import {
  takeLatest,
  all,
  // call
} from 'redux-saga/effects'
import {
  GET_USER_INFO,
  GET_ALL_USERS,
  SUBMIT_USER_FORM,
  SUBMIT_EDIT_USER_FORM,
  SUBMIT_PASSWORD_RESET_FORM,
} from './actions/users'
import { LOG_IN, LOG_OUT, CHECK_LOG_IN_STATE } from './actions/authentication'
import {
  fetchUserInfo,
  fetchAllUsers,
  submitUserForm,
  submitEditUserForm,
  submitPasswordResetForm,
} from './sagas/users'

import {
  GET_ACCOUNT_USER_INFO,
  SUBMIT_EDIT_USER_DETAIL_FORM,
  SUBMIT_EDIT_USER_PASSWORD_FORM,
} from './actions/settings'
import {
  fetchAccountUserInfo,
  submitEditUserDetailForm,
  submitEditUserPasswordForm,
} from './sagas/settings'

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
  logInUser,
  getAuthenticationState,
  logOutUser,
} from './sagas/authentication'
import {
  fetchAttendanceInfo,
  fetchAttendances,
  submitNewAttendanceForm,
  submitEditAttendanceForm,
} from './sagas/attendances'
import {
  GET_ATTENDANCE_INFO,
  GET_ALL_ATTENDANCES,
  SUBMIT_NEW_ATTENDANCE_FORM,
  SUBMIT_EDIT_ATTENDANCE_FORM,
} from './actions/attendances'
import { GET_ALL_ADDRESSES, GET_SEARCH_ADDRESSES } from './actions/addresses'
import { fetchAddressesSaga, searchAddressesSaga } from './sagas/addresses'
import { GET_CONFIG_DATA_DIVISIONS } from './actions/configData'
import { fetchMyanamrDivisionDataSaga } from './sagas/configData'
import {
  GET_ALL_EXTRAFUNDS,
  SUBMIT_NEW_EXTRAFUND_FORM,
  SUBMIT_EDIT_EXTRAFUND_FORM,
} from './actions/extraFunds'
import {
  fetchExtraFundsSaga,
  submitNewExtraFundsFormSaga,
  submitUpdateExtraFundsFormSaga,
} from './sagas/extraFunds'
import {
  GET_ALL_TRANSFER,
  SUBMIT_TRANSFER_FORM,
  SUBMIT_EDIT_TRANSFER_FORM,
} from './actions/transfers'
import {
  fetchAllTransfers,
  submitTransferForm,
  submitEditTransferForm,
} from './sagas/transfers'

// add Saga below
export default function* rootSaga() {
  yield all([
    takeLatest(LOG_IN, logInUser),
    takeLatest(LOG_OUT, logOutUser),
    takeLatest(CHECK_LOG_IN_STATE, getAuthenticationState),

    takeLatest(GET_ALL_USERS, fetchAllUsers),
    takeLatest(SUBMIT_USER_FORM, submitUserForm),
    takeLatest(SUBMIT_EDIT_USER_FORM, submitEditUserForm),
    takeLatest(SUBMIT_PASSWORD_RESET_FORM, submitPasswordResetForm),

    takeLatest(GET_USER_INFO, fetchUserInfo),
    takeLatest(GET_ACCOUNT_USER_INFO, fetchAccountUserInfo),
    takeLatest(SUBMIT_EDIT_USER_DETAIL_FORM, submitEditUserDetailForm),
    takeLatest(SUBMIT_EDIT_USER_PASSWORD_FORM, submitEditUserPasswordForm),

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
    takeLatest(SUBMIT_NEW_STUDENT_FORM, submitNewStudentForm),
    takeLatest(SUBMIT_EDIT_STUDENT_FORM, submitEditStudentForm),

    takeLatest(GET_ATTENDANCE_INFO, fetchAttendanceInfo),
    takeLatest(GET_ALL_ATTENDANCES, fetchAttendances),
    takeLatest(SUBMIT_NEW_ATTENDANCE_FORM, submitNewAttendanceForm),
    takeLatest(SUBMIT_EDIT_ATTENDANCE_FORM, submitEditAttendanceForm),

    takeLatest(GET_ALL_EXTRAFUNDS, fetchExtraFundsSaga),
    takeLatest(SUBMIT_NEW_EXTRAFUND_FORM, submitNewExtraFundsFormSaga),
    takeLatest(SUBMIT_EDIT_EXTRAFUND_FORM, submitUpdateExtraFundsFormSaga),

    takeLatest(GET_ALL_TRANSFER, fetchAllTransfers),
    takeLatest(SUBMIT_TRANSFER_FORM, submitTransferForm),
    takeLatest(SUBMIT_EDIT_TRANSFER_FORM, submitEditTransferForm),

    takeLatest(GET_CONFIG_DATA_DIVISIONS, fetchMyanamrDivisionDataSaga),
  ])
}
