import {
  put,
  // call
} from 'redux-saga/effects'
import {
  fetchExtraFunds,
  createExtraFund,
  updateExtrafund,
} from '../api/extraFunds'
import {
  GET_ALL_EXTRAFUNDS_SUCCESS,
  GET_ALL_EXTRAFUNDS_FAILURE,
  SUBMIT_NEW_EXTRAFUND_FORM_SUCCESS,
  SUBMIT_NEW_EXTRAFUND_FORM_FAILURE,
  SUBMIT_EDIT_EXTRAFUND_FORM_SUCCESS,
  SUBMIT_EDIT_EXTRAFUND_FORM_FAILURE,
} from '../actions/extraFunds'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchExtraFundsSaga(action) {
  try {
    const json = yield fetchExtraFunds()
    yield put({
      type: GET_ALL_EXTRAFUNDS_SUCCESS,
      extraFunds: json.data.extra_funds,
      newTransfers: json.data.new_transfers,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_EXTRAFUNDS_FAILURE)
  }
}

export function* submitNewExtraFundsFormSaga(action) {
  try {
    const extraFund = yield createExtraFund(action.extraFund)
    yield put({
      type: SUBMIT_NEW_EXTRAFUND_FORM_SUCCESS,
      extraFund: extraFund.extrafund,
    })
  } catch (error) {
    yield put({ type: SUBMIT_NEW_EXTRAFUND_FORM_FAILURE, error })
  }
}

export function* submitUpdateExtraFundsFormSaga(action) {
  try {
    const extraFund = yield updateExtrafund(action.extraFund)
    yield put({
      type: SUBMIT_EDIT_EXTRAFUND_FORM_SUCCESS,
      extraFund: extraFund.extrafund,
    })
  } catch (error) {
    yield put({ type: SUBMIT_EDIT_EXTRAFUND_FORM_FAILURE, error })
  }
}
