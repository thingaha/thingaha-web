import {
  SUBMIT_USER_FORM_SUCCESS,
  SUBMIT_USER_FORM_FAILURE,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from '../actions/users'

export default (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.users],
      }
    case GET_ALL_USERS_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_USER_FORM_SUCCESS:
      const newUser = action.user

      return {
        ...state,
        users: [...state.users, newUser],
      }
    case SUBMIT_USER_FORM_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
