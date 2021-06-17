import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,

  SUBMIT_USER_FORM_SUCCESS,
  SUBMIT_USER_FORM_FAILURE,

  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,

  SUBMIT_EDIT_USER_FORM_SUCCESS,
  SUBMIT_EDIT_USER_FORM_FAILURE,
  
  SUBMIT_PASSWORD_RESET_FORM_SUCCESS,
  SUBMIT_PASSWORD_RESET_FORM_FAILURE,
} from '../actions/users'
import {
  immutableAppendOrUpdate,
  normalizeRecordsById,
} from '../../utils/reducerHelpers'

export default (state = { users: {} }, action) => {
  switch (action.type) {
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        users: immutableAppendOrUpdate(state.users, action.user),
      }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: normalizeRecordsById(action.users),
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }
    case GET_ALL_USERS_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_USER_FORM_SUCCESS:
      return {
        ...state,
        users: immutableAppendOrUpdate(state.users, action.user),
      }
    case SUBMIT_USER_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_EDIT_USER_FORM_SUCCESS:
      return {
        ...state,
        users: immutableAppendOrUpdate(state.users, action.user),
      }
    case SUBMIT_EDIT_USER_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
      case SUBMIT_PASSWORD_RESET_FORM_SUCCESS:
      return {
        ...state,
        users: immutableAppendOrUpdate(state.users, action.user),
      }
    case SUBMIT_PASSWORD_RESET_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

//edituser
