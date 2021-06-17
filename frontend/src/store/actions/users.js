export const GET_USER_INFO = 'USERS/GET_USER_INFO'
export const GET_USER_INFO_SUCCESS = 'USERS/GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILURE = 'USERS/GET_USER_INFO_FAILURE'

export const GET_ALL_USERS = 'USERS/GET_ALL'
export const GET_ALL_USERS_SUCCESS = 'USERS/GET_ALL_SUCCESS'
export const GET_ALL_USERS_FAILURE = 'USERS/GET_ALL_FAILURE'

export const SUBMIT_USER_FORM = 'USERS/SUBMIT_USER_FORM'
export const SUBMIT_USER_FORM_SUCCESS = 'USERS/SUBMIT_USER_FORM_SUCCESS'
export const SUBMIT_USER_FORM_FAILURE = 'USERS/SUBMIT_USER_FORM_FAILURE'

export const SUBMIT_EDIT_USER_FORM = 'USERS/SUBMIT_EDIT_USER_FORM'
export const SUBMIT_EDIT_USER_FORM_SUCCESS =
  'USERS/SUBMIT_EDIT_USER_FORM_SUCCESS'
export const SUBMIT_EDIT_USER_FORM_FAILURE =
  'USERS/SUBMIT_EDIT_USER_FORM_FAILURE'

export const SUBMIT_PASSWORD_RESET_FORM = 'USERS/SUBMIT_PASSWORD_RESET_FORM'
export const SUBMIT_PASSWORD_RESET_FORM_SUCCESS =
  'USERS/SUBMIT_PASSWORD_RESET_FORM_SUCCESS'
export const SUBMIT_PASSWORD_RESET_FORM_FAILURE =
  'USERS/SUBMIT_PASSWORD_RESET_FORM_FAILURE'


export const fetchUser = (userId) => {
  return {
    type: GET_USER_INFO,
    userId: userId,
  }
}

export const fetchUsers = ({ page, perPage } = { page: 1, perPage: 20 }) => {
  return {
    type: GET_ALL_USERS,
    page,
    perPage,
  }
}

export const submitUserForm = (formValues) => {
  return {
    type: SUBMIT_USER_FORM,
    user: formValues,
  }
}

export const submitEditUserForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_USER_FORM,
    user: formValues,
  }
}

export const submitPasswordResetForm = (formValues) => {
  return {
    type: SUBMIT_PASSWORD_RESET_FORM,
    user: formValues,
  }
}