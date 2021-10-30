import { put } from 'redux-saga/effects'
import {
  fetchStudent,
  fetchStudents,
  createStudent,
  editStudent,
  deleteStudentPhoto,
} from '../api/students'
import {
  GET_STUDENT_INFO_SUCCESS,
  GET_STUDENT_INFO_FAILURE,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
  SUBMIT_NEW_STUDENT_FORM_FAILURE,
  SUBMIT_NEW_STUDENT_FORM_SUCCESS,
  SUBMIT_EDIT_STUDENT_FORM_SUCCESS,
  DELETE_STUDENT_PHOTO_SUCCESS,
  SUBMIT_EDIT_STUDENT_FORM_FAILURE,
  DELETE_STUDENT_PHOTO_FAILURE,
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

export function* fetchAllStudents(
  { keyword, page, perPage } = { page: 1, perPage: 20 }
) {
  try {
    const { data } = yield fetchStudents({ keyword, page, perPage })
    yield put({
      type: GET_ALL_STUDENTS_SUCCESS,
      students: data.students,
      totalCount: data.total_count,
      totalPages: data.total_pages,
    })
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

export function* deleteStudentPhotoSaga({ studentId }) {
  try {
    yield deleteStudentPhoto({ studentId })

    yield put({ type: DELETE_STUDENT_PHOTO_SUCCESS, studentId })
  } catch (error) {
    yield put({ type: DELETE_STUDENT_PHOTO_FAILURE, error })
  }
}
