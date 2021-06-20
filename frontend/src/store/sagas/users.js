import {
  put,
  // call
} from 'redux-saga/effects'
import {
  fetchUser,
  fetchUsers,
  createUser,
  editUser,
  passwordReset,
} from '../api/users' //API Called
import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  SUBMIT_USER_FORM_FAILURE,
  SUBMIT_USER_FORM_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  SUBMIT_EDIT_USER_FORM_SUCCESS,
  SUBMIT_EDIT_USER_FORM_FAILURE,
  SUBMIT_PASSWORD_RESET_FORM_SUCCESS,
  SUBMIT_PASSWORD_RESET_FORM_FAILURE,
} from '../actions/users'
import { toast } from 'react-toastify'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchUserInfo(action) {
  try {
    const { data } = yield fetchUser(action.userId)
    yield put({
      type: GET_USER_INFO_SUCCESS,
      user: data.user,
    })
  } catch (error) {
    yield put({ type: GET_USER_INFO_FAILURE, error })
  }
}

export function* fetchAllUsers({ page, perPage }) {
  //Saga Func
  try {
    const { data } = yield fetchUsers({ page, perPage })
    yield put({
      type: GET_ALL_USERS_SUCCESS,
      users: data.users,
      totalPages: data.total_pages,
      totalCount: data.total_count,
    })
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

export function* submitPasswordResetForm(action) {
  try {
    const json = yield passwordReset(action.user)
    console.log('aa')
    toast.success('User successfully updated!')
    yield put({ type: SUBMIT_PASSWORD_RESET_FORM_SUCCESS, user: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_PASSWORD_RESET_FORM_FAILURE)
  }
}
