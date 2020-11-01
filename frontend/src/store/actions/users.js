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

export const fetchUsers = () => {
  return {
    type: GET_ALL_USERS,
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
