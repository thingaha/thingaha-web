import {
  put,
  // call
} from 'redux-saga/effects'
import { getDonationsForMonth } from '../api/donations'
import {
  GET_DONATIONS_FOR_MONTH_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
} from '../actions/donations'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchDonationsForMonth(action) {
  try {
    const response = yield getDonationsForMonth()

    yield put({
      type: GET_DONATIONS_FOR_MONTH_SUCCESS,
      donations: response.data,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_DONATIONS_FOR_MONTH_FAILURE)
  }
}

export function* startDonationStatusUpdate(action) {
  try {
    // for now don't use api value since there is no api yet
    // const _response = yield updateDonationStatus()

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
