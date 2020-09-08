import { call, put } from 'redux-saga/effects'
import {
  GET_ALL_SCHOOLS_SUCCESS,
  GET_ALL_SCHOOLS_FAILURE,
  SUBMIT_NEW_SCHOOL_FORM_SUCCESS,
  SUBMIT_NEW_SCHOOL_FORM_FAILURE,
  SUBMIT_EDIT_SCHOOL_FORM_SUCCESS,
  SUBMIT_EDIT_SCHOOL_FORM_FAILURE,
} from '../actions/schools'
import { fetchSchools, createSchool, editSchool } from '../api/schools'

export function* fetchAllSchools(action) {
  try {
    const json = yield call(fetchSchools)
    yield put({ type: GET_ALL_SCHOOLS_SUCCESS, schools: json.data.schools })
  } catch (error) {
    yield put({ type: GET_ALL_SCHOOLS_FAILURE, error })
  }
}

export function* submitNewSchoolForm(action) {
  try {
    const json = yield createSchool(action.school)
    yield put({ type: SUBMIT_NEW_SCHOOL_FORM_SUCCESS, school: json.data })
  } catch (error) {
    yield put({ type: SUBMIT_NEW_SCHOOL_FORM_FAILURE, error })
  }
}
export function* submitEditSchoolForm(action) {
  try {
    const json = yield editSchool(action.school)
    yield put({ type: SUBMIT_EDIT_SCHOOL_FORM_SUCCESS, schools: json.data })
  } catch (error) {
    yield put({ type: SUBMIT_EDIT_SCHOOL_FORM_FAILURE, error })
  }
}
