import {
  put,
  // call
} from 'redux-saga/effects'
import { fetchAddresses } from '../api/addresses'
import {
  GET_ALL_ADDRESSES_SUCCESS,
  GET_ALL_ADDRESSES_FAILURE,
  GET_SEARCH_ADDRESSES_SUCCESS,
  GET_SEARCH_ADDRESSES_FAILURE,
} from '../actions/addresses'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchAddressesSaga(action) {
  try {
    const json = yield fetchAddresses()
    yield put({
      type: GET_ALL_ADDRESSES_SUCCESS,
      addresses: json.data.addresses,
      count: json.data.count,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_ADDRESSES_FAILURE)
  }
}

export function* searchAddressesSaga(action) {
  try {
    const json = yield fetchAddresses()
    yield put({
      type: GET_SEARCH_ADDRESSES_SUCCESS,
      addresses: json.data.addresses,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_SEARCH_ADDRESSES_FAILURE)
  }
}
