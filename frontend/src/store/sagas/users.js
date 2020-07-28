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

export function* fetchAllUsers(action) {
  try {
    // const { backendResponse: json } = yield call([axios, 'get'], '/users') // TODO to call api endpoint
    const json = yield fetchUsers()
    yield put({ type: GET_ALL_USERS_SUCCESS, users: json.data.users })
  } catch (error) {
    yield put({ type: GET_ALL_USERS_FAILURE, error })
  }
}

export function* submitUserForm(action) {
  try {
    // const { backendResponse: json } = yield call([axios, 'get'], '/users') // TODO to call api endpoint
    const json = yield createUser(action.user)
    yield put({ type: SUBMIT_USER_FORM_SUCCESS, user: json.data })
  } catch (error) {
    console.log('Error', error)
    yield put({ type: SUBMIT_USER_FORM_FAILURE, error })
  }
}
