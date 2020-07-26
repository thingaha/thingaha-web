export default (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USERS/GET_ALL_SUCCESS':
      return {
        ...state,
        users: action.json,
      }
    case 'USERS/GET_ALL_FAIL':
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
