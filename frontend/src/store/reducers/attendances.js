import {
  GET_ALL_ATTENDANCES_SUCCESS,
  GET_ALL_ATTENDANCES_FAILURE,
} from '../actions/attendances'
import {
  immutableAppendOrUpdate,
  normalizeRecordsById,
} from '../../utils/reducerHelpers'

export default (state = { attendances: {}, errors: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ATTENDANCES_SUCCESS:
      return {
        ...state,
        attendances: normalizeRecordsById(action.attendances),
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }
    case GET_ALL_ATTENDANCES_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}
