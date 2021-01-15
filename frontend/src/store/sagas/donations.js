import {
  put,
  // call
} from 'redux-saga/effects'
import { getDonationsForMonth, fetchAllDonations } from '../api/donations'
import {
  GET_ALL_DONATIONS_SUCCESS,
  GET_ALL_DONATIONS_FAILURE,
  GET_DONATIONS_FOR_MONTH_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
} from '../actions/donations'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchDonations({ page }) {
  try {
    const { data } = yield fetchAllDonations({ page })

    yield put({
      type: GET_ALL_DONATIONS_SUCCESS,
      donations: data.donations,
      totalCount: data.total_count,
      totalPages: data.total_pages,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_DONATIONS_FAILURE)
  }
}

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
