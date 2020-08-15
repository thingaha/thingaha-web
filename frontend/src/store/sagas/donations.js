import {
  put,
  // call
} from 'redux-saga/effects'
import { getDonationsForMonth } from '../api/donations'
import {
  GET_DONATIONS_FOR_MONTH_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  GET_DONATIONS_FOR_MONTH,
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
