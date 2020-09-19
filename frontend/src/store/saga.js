import {
  takeLatest,
  all,
  // call
} from 'redux-saga/effects'
import { GET_ALL_USERS, SUBMIT_USER_FORM } from './actions/users'
import { LOGIN } from './actions/authentication'
import { fetchAllUsers, submitUserForm } from './sagas/users'
import {
  GET_DONATIONS_FOR_MONTH,
  UPDATE_DONATION_STATUS,
} from './actions/donations'
import {
  fetchDonationsForMonth,
  startDonationStatusUpdate,
} from './sagas/donations'
import { loginUser } from './sagas/authentication'

// add Saga below
export default function* rootSaga() {
  yield all([
    takeLatest(GET_ALL_USERS, fetchAllUsers),
    takeLatest(SUBMIT_USER_FORM, submitUserForm),
    takeLatest(GET_DONATIONS_FOR_MONTH, fetchDonationsForMonth),
    takeLatest(UPDATE_DONATION_STATUS, startDonationStatusUpdate),
    takeLatest(LOGIN, loginUser),
  ])
}
