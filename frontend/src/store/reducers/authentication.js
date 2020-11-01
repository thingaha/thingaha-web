import { AUTH_FAILURE, LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/authentication'

export default (
  state = { authenticated: false, currentUser: null },
  action
) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    case AUTH_FAILURE:
      // TODO handle error
      return {
        ...state,
        authenticated: false,
        currentUser: null,
        error: action.errorResponse,
      }
    case LOGIN_SUCCESS:
      const currentUser = action.currentUser

      return {
        ...state,
        authenticated: true,
        currentUser,
      }
    default:
      return state
  }
}
