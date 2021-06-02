import {
  put,
  // call
} from 'redux-saga/effects'
import { fetchUsers, editUserDetail } from '../api/settings' //API Called
import {
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS,
  SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE,
} from '../actions/settings'
import { toast } from 'react-toastify'
import defaultErrorHandler from './defaultErrorHandler'

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

export function* submitEditUserDetailForm(action) {
  try {
    const json = yield editUserDetail(action.user)
    toast.success('User successfully updated!')
    yield put({ type: SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS, user: json.data })
  } catch (error) {
    yield defaultErrorHandler(error, SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE)
  }
}
