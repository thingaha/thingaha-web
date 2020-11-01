export const LOGIN = 'AUTHENTICATION/LOGIN'
export const LOGIN_FAILURE = 'AUTHENTICATION/LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'AUTHENTICATION/LOGIN_SUCCESS'
export const AUTH_FAILURE = 'AUTHENTICATION/AUTH_FAILURE'

export const loginUser = ({ email, password }) => {
  return {
    type: LOGIN,
    email,
    password,
  }
}
