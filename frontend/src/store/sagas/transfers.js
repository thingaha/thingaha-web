import { call, put } from 'redux-saga/effects'

import { fetchTransfers, createTransfer, editTransfer } from '../api/transfers' //API Called
import {
  SUBMIT_TRANSFER_FORM_FAILURE,
  SUBMIT_TRANSFER_FORM_SUCCESS,
  GET_ALL_TRANSFERS_SUCCESS,
  GET_ALL_TRANSFERS_FAILURE,
  SUBMIT_EDIT_TRANSFER_FORM_SUCCESS,
  SUBMIT_EDIT_TRANSFER_FORM_FAILURE,
} from '../actions/transfers'
import { toast } from 'react-toastify'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchAllTransfers(action) {
  //Saga Func
  try {
    const json = yield call(fetchTransfers, { page: action.page })
    yield put({
      type: GET_ALL_TRANSFERS_SUCCESS,
      transfers: json.data.transfers,
      totalCount: json.data.total_count,
      totalPages: json.data.total_pages,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_TRANSFERS_FAILURE)
  }
}

export function* submitTransferForm(action) {
  try {
    //const { transfer } = yield createTransfer(action.transfer)
    const json = yield createTransfer(action.transfer)
    toast.success('New transfer data successfully added!')
    yield put({ type: SUBMIT_TRANSFER_FORM_SUCCESS, transfer: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_TRANSFER_FORM_FAILURE)
  }
}

export function* submitEditTransferForm(action) {
  try {
    //const { transfer } = yield editTransfer(action.transfer)
    const json = yield editTransfer(action.transfer)
    toast.success('Transfer successfully updated!')
    yield put({ type: SUBMIT_EDIT_TRANSFER_FORM_SUCCESS, transfer: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_EDIT_TRANSFER_FORM_FAILURE)
  }
}
