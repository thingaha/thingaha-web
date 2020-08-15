import {
  GET_DONATIONS_FOR_MONTH,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  GET_DONATIONS_FOR_MONTH_FAILURE,
} from '../actions/donations'

export default (state = { donations: [] }, action) => {
  switch (action.type) {
    case GET_DONATIONS_FOR_MONTH_SUCCESS:
      return {
        ...state,
        donations: [...action.donations],
      }
    case GET_DONATIONS_FOR_MONTH_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
