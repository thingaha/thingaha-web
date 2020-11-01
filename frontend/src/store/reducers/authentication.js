import {
  AUTH_FAILURE,
  LOG_OUT_FAILURE,
  LOG_IN_SUCCESS,
  SET_LOG_IN_STATE,
  CLEAR_LOG_IN_STATE,
} from '../actions/authentication'

export default (state = { accessToken: null, currentUser: null }, action) => {
  switch (action.type) {
    case SET_LOG_IN_STATE:
      return {
        ...state,
        accessToken: action.accessToken,
        currentUser: action.currentUser,
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        currentUser: action.currentUser,
      }
    case CLEAR_LOG_IN_STATE:
      return {
        ...state,
        accessToken: null,
        currentUser: null,
      }
    case AUTH_FAILURE:
      return {
        ...state,
        accessToken: null,
        currentUser: null,
      }
    case LOG_OUT_FAILURE:
      // For some reason, clearing local storage failed.
      return {
        ...state,
        accessToken: null,
        currentUser: null,
      }
    default:
      return state
  }
}
