import { GET_ALL_USERS } from '../actions/users'

export default (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      }

    default:
      return state
  }
}
