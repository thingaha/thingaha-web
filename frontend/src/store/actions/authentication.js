export const LOG_IN = 'AUTHENTICATION/LOG_IN'
export const LOG_OUT = 'AUTHENTICATION/LOG_OUT'
export const LOG_IN_FAILURE = 'AUTHENTICATION/LOG_IN_FAILURE'
export const LOG_OUT_FAILURE = 'AUTHENTICATION/LOG_OUT_FAILURE'
export const LOG_IN_SUCCESS = 'AUTHENTICATION/LOG_IN_SUCCESS'
export const SET_LOG_IN_STATE = 'AUTHENTICATION/SET_LOG_IN_STATE'
export const CLEAR_LOG_IN_STATE = 'AUTHENTICATION/CLEAR_LOG_IN_STATE'
export const CHECK_LOG_IN_STATE = 'AUTHENTICATION/CHECK_LOG_IN_STATE'
export const AUTH_FAILURE = 'AUTHENTICATION/AUTH_FAILURE'

export const logInUser = ({ email_or_username, password }) => {
  return {
    type: LOG_IN,
    email_or_username,
    password,
  }
}

export const checkLoginState = () => {
  return {
    type: CHECK_LOG_IN_STATE,
  }
}

export const logOutUser = () => {
  return {
    type: LOG_OUT,
  }
}
