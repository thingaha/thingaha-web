import { put } from 'redux-saga/effects'
import {
  fetchStudent,
  fetchStudents,
  createStudent,
  editStudent,
} from '../api/students'
import {
  GET_STUDENT_INFO_SUCCESS,
  GET_STUDENT_INFO_FAILURE,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
  SUBMIT_NEW_STUDENT_FORM_FAILURE,
  SUBMIT_NEW_STUDENT_FORM_SUCCESS,
  SUBMIT_EDIT_STUDENT_FORM_SUCCESS,
  SUBMIT_EDIT_STUDENT_FORM_FAILURE,
} from '../actions/students'

export function* fetchStudentInfo(action) {
  try {
    const { data } = yield fetchStudent(action.studentId)
    yield put({
      type: GET_STUDENT_INFO_SUCCESS,
      student: data.student,
    })
  } catch (error) {
    yield put({ type: GET_STUDENT_INFO_FAILURE, error })
  }
}

export function* fetchAllStudents(action) {
  try {
    const json = yield fetchStudents()
    yield put({ type: GET_ALL_STUDENTS_SUCCESS, students: json.data.students })
  } catch (error) {
    yield put({ type: GET_ALL_STUDENTS_FAILURE, error })
  }
}

export function* submitNewStudentForm(action) {
  try {
    const { student } = yield createStudent(action.student)
    yield put({ type: SUBMIT_NEW_STUDENT_FORM_SUCCESS, student: student })
  } catch (error) {
    yield put({ type: SUBMIT_NEW_STUDENT_FORM_FAILURE, error })
  }
}

export function* submitEditStudentForm(action) {
  try {
    const { student } = yield editStudent(action.student)

    yield put({ type: SUBMIT_EDIT_STUDENT_FORM_SUCCESS, student: student })
  } catch (error) {
    yield put({ type: SUBMIT_EDIT_STUDENT_FORM_FAILURE, error })
  }
}
