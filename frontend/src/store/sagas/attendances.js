import { put } from 'redux-saga/effects'
import {
  fetchAttendance,
  fetchAllAttendances,
  createAttendance,
  editAttendance,
} from '../api/attendances'
import {
  GET_ATTENDANCE_INFO_SUCCESS,
  GET_ATTENDANCE_INFO_FAILURE,
  GET_ALL_ATTENDANCES_SUCCESS,
  GET_ALL_ATTENDANCES_FAILURE,
  SUBMIT_NEW_ATTENDANCE_FORM_FAILURE,
  SUBMIT_NEW_ATTENDANCE_FORM_SUCCESS,
  SUBMIT_EDIT_ATTENDANCE_FORM_SUCCESS,
  SUBMIT_EDIT_ATTENDANCE_FORM_FAILURE,
} from '../actions/attendances'

import defaultErrorHandler from './defaultErrorHandler'

export function* fetchAttendanceInfo(action) {
  try {
    const { data } = yield fetchAttendance(action.attendanceId)
    yield put({
      type: GET_ATTENDANCE_INFO_SUCCESS,
      attendance: data.attendance,
    })
  } catch (error) {
    yield put({ type: GET_ATTENDANCE_INFO_FAILURE, error })
  }
}

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

export function* submitNewAttendanceForm(action) {
  try {
    const { attendance } = yield createAttendance(action.attendance)
    yield put({
      type: SUBMIT_NEW_ATTENDANCE_FORM_SUCCESS,
      attendance: attendance,
    })
  } catch (error) {
    yield put({ type: SUBMIT_NEW_ATTENDANCE_FORM_FAILURE, error })
  }
}

export function* submitEditAttendanceForm(action) {
  try {
    const { attendance } = yield editAttendance(action.attendance)

    yield put({
      type: SUBMIT_EDIT_ATTENDANCE_FORM_SUCCESS,
      attendance: attendance,
    })
  } catch (error) {
    yield put({ type: SUBMIT_EDIT_ATTENDANCE_FORM_FAILURE, error })
  }
}
