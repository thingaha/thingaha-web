import {
  put,
  // call
} from 'redux-saga/effects'
import {
  createDonation,
  editDonation,
  getDonationsForMonth,
  fetchAllDonations,
  fetchDonation,
} from '../api/donations'
import {
  GET_ALL_DONATIONS_SUCCESS,
  GET_ALL_DONATIONS_FAILURE,
  GET_DONATIONS_FOR_MONTH_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  GET_DONATION_INFO_SUCCESS,
  GET_DONATION_INFO_FAILURE,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
  SUBMIT_NEW_DONATION_FORM_FAILURE,
  SUBMIT_NEW_DONATION_FORM_SUCCESS,
  SUBMIT_EDIT_DONATION_FORM_SUCCESS,
  SUBMIT_EDIT_DONATION_FORM_FAILURE,
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

export function* fetchDonationsForMonth({ year, month }) {
  try {
    const response = yield getDonationsForMonth({ year, month })

    yield put({
      type: GET_DONATIONS_FOR_MONTH_SUCCESS,
      donations: response.data.donations,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_DONATIONS_FOR_MONTH_FAILURE)
  }
}

export function* fetchDonationInfo(action) {
  try {
    const { data } = yield fetchDonation(action.donationId)

    yield put({
      type: GET_DONATION_INFO_SUCCESS,
      donation: data.donation,
    })
  } catch (error) {
    yield put({ type: GET_DONATION_INFO_FAILURE, error })
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

export function* submitNewDonationForm(action) {
  try {
    const { donation } = yield createDonation(action.donation)
    yield put({ type: SUBMIT_NEW_DONATION_FORM_SUCCESS, donation: donation })
  } catch (error) {
    yield put({ type: SUBMIT_NEW_DONATION_FORM_FAILURE, error })
  }
}

export function* submitEditDonationForm(action) {
  try {
    const { donation } = yield editDonation(action.donation)

    yield put({ type: SUBMIT_EDIT_DONATION_FORM_SUCCESS, donation: donation })
  } catch (error) {
    yield put({ type: SUBMIT_EDIT_DONATION_FORM_FAILURE, error })
  }
}
