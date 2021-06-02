export const GET_ALL_USERS = 'SETTINGS/GET_ALL'
export const GET_ALL_USERS_SUCCESS = 'SETTINGS/GET_ALL_SUCCESS'
export const GET_ALL_USERS_FAILURE = 'SETTINGS/GET_ALL_FAILURE'
export const SUBMIT_EDIT_USER_DETAIL_FORM = 'SETTINGS/SUBMIT_EDIT_USER_DETAIL_FORM'
export const SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS =
  'SETTINGS/SUBMIT_EDIT_USER_DETAIL_FORM_SUCCESS'
export const SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE =
  'SETTINGS/SUBMIT_EDIT_USER_DETAIL_FORM_FAILURE'

export const fetchUsers = ({ page, perPage } = { page: 1, perPage: 20 }) => {
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

// export const submitEditPasswordForm = (formValues) => {
//   return {
//     type: SUBMIT_EDIT_PASSWORD_FORM,
//     user: formValues,
//   }
// }