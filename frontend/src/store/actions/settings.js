export const GET_USER_INFO = 'USERS/GET_USER_INFO'
export const GET_USER_INFO_SUCCESS = 'USERS/GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILURE = 'USERS/GET_USER_INFO_FAILURE'

export const GET_ALL_USERS = 'SETTINGS/GET_ALL'
export const GET_ALL_USERS_SUCCESS = 'SETTINGS/GET_ALL_SUCCESS'
export const GET_ALL_USERS_FAILURE = 'SETTINGS/GET_ALL_FAILURE'

export const SUBMIT_EDIT_USER_DETAIL_FORM = 'SETTINGS/SUBMIT_EDIT_USER_DETAIL_FORM'
export const SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS =
  'SETTINGS/SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS'
export const SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE =
  'SETTINGS/SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE'

export const SUBMIT_EDIT_USER_PASSWORD_FORM = 'SETTINGS/SUBMIT_EDIT_USER_PASSWORD_FORM'
export const SUBMIT_EDIT_USER_PASSWORD_FORM_SUCCESS =
  'SETTINGS/SUBMIT_EDIT_USER_PASSWORD_FORM_SUCCESS'
export const SUBMIT_EDIT_USER_PASSWORD_FORM_FAILURE =
  'SETTINGS/SUBMIT_EDIT_USER_PASSWORD_FORM_FAILURE'

export const fetchUser = (userId) => {
  return {
    type: GET_USER_INFO,
    userId: userId,
  }
}

export const fetchUsers = () => {
  return {
    type: GET_ALL_USERS,
  }
}

export const submitEditUserDetailForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_USER_DETAIL_FORM,
    user: formValues,
  }
}

export const submitEditUserPasswordForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_USER_PASSWORD_FORM,
    user: formValues,
  }
}