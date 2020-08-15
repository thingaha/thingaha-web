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
    // const { backendResponse: json } = yield call([axios, 'get'], '/users') // TODO to call api endpoint
    const json = yield getDonationsForMonth()

    yield put({
      type: GET_DONATIONS_FOR_MONTH_SUCCESS,
      donations: json.data.donations,
    })
  } catch (error) {
    yield put({ type: GET_DONATIONS_FOR_MONTH_FAILURE, error })
  }
}
