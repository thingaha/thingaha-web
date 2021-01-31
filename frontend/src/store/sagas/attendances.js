import {
  put,
  // call
} from 'redux-saga/effects'
import { fetchAllAttendances } from '../api/attendances'
import {
  GET_ALL_ATTENDANCES_SUCCESS,
  GET_ALL_ATTENDANCES_FAILURE,
} from '../actions/attendances'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchAttendances({ page, perPage }) {
  try {
    const { data } = yield fetchAllAttendances({ page, perPage })

    yield put({
      type: GET_ALL_ATTENDANCES_SUCCESS,
      attendances: data.attendances,
      totalCount: data.total_count,
      totalPages: data.total_pages,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_ATTENDANCES_FAILURE)
  }
}
