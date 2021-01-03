import {
  put,
  // call
} from 'redux-saga/effects'
import { fetchUsers, createUser, editUser } from '../api/users' //API Called
import {
  SUBMIT_USER_FORM_FAILURE,
  SUBMIT_USER_FORM_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  SUBMIT_EDIT_USER_FORM_SUCCESS,
  SUBMIT_EDIT_USER_FORM_FAILURE,
} from '../actions/users'
import { toast } from 'react-toastify'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchAllUsers(action) {
  //Saga Func
  try {
    const json = yield fetchUsers()
    yield put({ type: GET_ALL_USERS_SUCCESS, users: json.data.users })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_USERS_FAILURE)
  }
}

export function* submitUserForm(action) {
  try {
    // const { backendResponse: json } = yield call([axios, 'get'], '/users') // TODO to call api endpoint
    const json = yield createUser(action.user)
    toast.success('User successfully created.')
    yield put({ type: SUBMIT_USER_FORM_SUCCESS, user: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_USER_FORM_FAILURE)
  }
}

export function* submitEditUserForm(action) {
  try {
    const json = yield editUser(action.user)
    toast.success('User successfully updated!')
    yield put({ type: SUBMIT_EDIT_USER_FORM_SUCCESS, user: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_EDIT_USER_FORM_FAILURE)
  }
}
