import {
  put,
  // call
} from 'redux-saga/effects'
import { getDonationsForMonth, updateDonationStatus } from '../api/donations'
import {
  GET_DONATIONS_FOR_MONTH_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
} from '../actions/donations'

export function* fetchDonationsForMonth(action) {
  try {
    const response = yield getDonationsForMonth()

    yield put({
      type: GET_DONATIONS_FOR_MONTH_SUCCESS,
      donations: response.data.data,
    })
  } catch (error) {
    yield put({ type: GET_DONATIONS_FOR_MONTH_FAILURE, error })
  }
}

export function* startDonationStatusUpdate(action) {
  try {
    const response = yield updateDonationStatus()

    yield put({
      type: UPDATE_DONATION_STATUS_SUCCESS,
      id: action.id,
      status: action.status,
    })
  } catch (error) {
    yield put({
      type: UPDATE_DONATION_STATUS_FAILURE,
      error,
    })
  }
}
