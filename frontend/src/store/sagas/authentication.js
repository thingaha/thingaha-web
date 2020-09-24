import {
  put,
  // call
} from 'redux-saga/effects'
import { login } from '../api/authentication'
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/authentication'

export function* loginUser(action) {
  const { email, password } = action

  try {
    const { user } = yield login({ email, password })

    yield put({ type: LOGIN_SUCCESS, currentUser: user })
  } catch (error) {
    console.error(error)
    yield put({ type: LOGIN_FAILURE, error })
  }
}
