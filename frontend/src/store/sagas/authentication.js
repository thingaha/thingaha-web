import {
  put,
} from 'redux-saga/effects'
import { login } from '../api/authentication'
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/authentication'
import defaultErrorHandler from './defaultErrorHandler'
import { toast } from 'react-toastify'

export function* loginUser(action) {
  const { email, password } = action

  try {
    const { user } = yield login({ email, password })

    toast.success("Login successful")
    yield put({ type: LOGIN_SUCCESS, currentUser: user })
  } catch (error) {
    yield defaultErrorHandler(error, LOGIN_FAILURE)
  }
}
