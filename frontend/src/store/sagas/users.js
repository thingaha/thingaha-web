import {
  put,
  // call
} from 'redux-saga/effects'
import { fetchUsers, createUser } from '../api/users'
import {
  SUBMIT_USER_FORM_FAILURE,
  SUBMIT_USER_FORM_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from '../actions/users'
import { AUTH_FAILURE } from "../actions/authentication";

export function* fetchAllUsers(action) {
  try {
    const json = yield fetchUsers()
    yield put({ type: GET_ALL_USERS_SUCCESS, users: json.data.users })
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failure", error.response.data)
      yield put({type: AUTH_FAILURE, errorResponse: error.response.data })
    } else {
      yield put({ type: GET_ALL_USERS_FAILURE, error })
    }
  }
}

export function* submitUserForm(action) {
  try {
    // const { backendResponse: json } = yield call([axios, 'get'], '/users') // TODO to call api endpoint
    const json = yield createUser(action.user)
    yield put({ type: SUBMIT_USER_FORM_SUCCESS, user: json.data })
  } catch (error) {
    yield put({ type: SUBMIT_USER_FORM_FAILURE, error })
  }
}
