import {
  put,
  // call
} from 'redux-saga/effects'
import {
  fetchUser,
  fetchUsers,
  editUserDetail,
  changePassword,
} from '../api/settings' //API Called
import {
  GET_ACCOUNT_USER_INFO_SUCCESS,
  GET_ACCOUNT_USER_INFO_FAILURE,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS,
  SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE,
  SUBMIT_PASSWORD_CHANGE_FORM_FAILURE,
} from '../actions/settings'
import { toast } from 'react-toastify'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchAccountUserInfo(action) {
  try {
    const { data } = yield fetchUser(action.userId)
    yield put({
      type: GET_ACCOUNT_USER_INFO_SUCCESS,
      user: data.user,
    })
  } catch (error) {
    yield put({ type: GET_ACCOUNT_USER_INFO_FAILURE, error })
  }
}

export function* fetchAllUsers() {
  //Saga Func
  try {
    const { data } = yield fetchUsers()
    yield put({
      type: GET_ALL_USERS_SUCCESS,
      users: data.users,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_ALL_USERS_FAILURE)
  }
}

export function* submitEditUserDetailForm(action) {
  try {
    const json = yield editUserDetail(action.user)
    toast.success('User successfully updated!')
    yield put({ type: SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS, user: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE)
  }
}

export function* submitPasswordChangeForm({
  currentPassword,
  newPassword,
  newPasswordConfirmation,
}) {
  try {
    const json = yield changePassword({
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    })
    toast.success('User successfully updated!')
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_PASSWORD_CHANGE_FORM_FAILURE)
  }
}
